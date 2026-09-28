import authService from '../services/authService.js';
import { hasPermission, isRoleAllowed } from '../config/roles.js';
import dbStore from '../db/dbStore.js';

// Extract token from Bearer header
function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

// Optional authentication: sets req.user if valid token provided, does not block if not
export function authenticateOptional(req, res, next) {
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = authService.verifyToken(token);
      req.user = decoded;
    }
  } catch (err) {
    // Ignore invalid optional token, continue as unauthenticated
    req.user = null;
  }
  next();
}

// Mandatory authentication: returns 401 if missing or invalid token
export function requireAuth(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication token required to access this resource.'
      });
    }

    const decoded = authService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired session. Please sign in again.'
    });
  }
}

// Role-based authorization: returns 403 if user's role is not in the allowed list
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // First ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required.'
      });
    }

    const userRole = req.user.role;
    if (!isRoleAllowed(userRole, allowedRoles)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Access denied. Your role '${userRole}' is not permitted to perform this action.`,
        requiredRoles: allowedRoles,
        userRole: userRole
      });
    }

    next();
  };
}

// Permission-based authorization: returns 403 if user's role lacks the specific permission
export function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required.'
      });
    }

    const userRole = req.user.role;
    if (!hasPermission(userRole, permission)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Access denied. Insufficient permissions for action: '${permission}'.`,
        permission: permission,
        userRole: userRole
      });
    }

    next();
  };
}

// Facility ownership verification middleware
// Ensures Cold Storage Owner can ONLY modify their own facility, while Admin can modify any facility
export function verifyFacilityOwnership(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required.' });
  }

  // Admin has universal override
  if (req.user.role === 'admin') {
    return next();
  }

  if (req.user.role !== 'owner') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Only registered facility owners or administrators can manage storage capacity.'
    });
  }

  const facilityId = req.params.id || req.body.facilityId;
  const facility = dbStore.getColdStorageById(facilityId);

  if (!facility) {
    return res.status(404).json({ error: 'Not Found', message: 'Cold storage facility not found.' });
  }

  // Check if owner ID matches or facility belongs to this owner's account
  // Allow demo owner (usr-owner-01) or matching email/ownerId
  const isOwner = (facility.ownerId && facility.ownerId === req.user.id) ||
                  (facility.contactPhone && facility.contactPhone === req.user.phone) ||
                  (facility.contactPerson && facility.contactPerson.toLowerCase() === req.user.name.toLowerCase()) ||
                  (req.user.id === 'usr-owner-01' && facility.id === 'cs-gnt-001') ||
                  (facility.ownerEmail && facility.ownerEmail === req.user.email);

  if (!isOwner) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access denied: You are only authorized to modify live capacity for your own facility.'
    });
  }

  req.facility = facility;
  next();
}

export default {
  authenticateOptional,
  requireAuth,
  requireRole,
  requirePermission,
  verifyFacilityOwnership
};
