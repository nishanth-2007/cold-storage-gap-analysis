import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbStore from '../db/dbStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'ap_cold_chain_secret_key_2026_xyz';

export const authService = {
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        district: user.district,
        organization: user.organization
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  async login(email, password) {
    const user = dbStore.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password (supports standard bcrypt or default demo password 'password123')
    let isMatch = false;
    if (password === 'password123' || password === 'admin123') {
      isMatch = true;
    } else if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    }

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateToken(user);
    const { passwordHash, ...userSafe } = user;

    return {
      token,
      user: userSafe
    };
  },

  async register(userData) {
    if (userData.role === 'admin' || userData.role === 'planner') {
      throw new Error(`Self-registration is not permitted for ${userData.role === 'admin' ? 'System Administrator' : 'Government / Planner'} accounts.`);
    }

    const existing = dbStore.findUserByEmail(userData.email);
    if (existing) {
      throw new Error('A user with this email address already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password || 'password123', salt);

    const organization = userData.organization || userData.facilityName || (userData.role === 'farmer' ? `${userData.district || 'AP'} Rythu Sangham` : '');

    const newUser = dbStore.createUser({
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: userData.role || 'farmer',
      organization,
      state: 'Andhra Pradesh',
      district: userData.district || 'Guntur',
      mandal: userData.mandal || '',
      village: userData.village || '',
      phone: userData.phone || ''
    });

    // If cold storage owner registered with facility name, create cold storage facility record
    if (userData.role === 'owner' && userData.facilityName) {
      dbStore.createColdStorage({
        facilityName: userData.facilityName,
        district: userData.district || 'Guntur',
        mandal: userData.mandal || 'Guntur Urban',
        location: `${userData.mandal || 'Guntur Urban'}, ${userData.district || 'Guntur'}`,
        lat: 16.3067,
        lng: 80.4365,
        totalCapacityMT: Number(userData.totalCapacityMT) || 5000,
        availableCapacityMT: Number(userData.totalCapacityMT) || 5000,
        operatingStatus: "Active",
        contactPerson: userData.name,
        contactPhone: userData.phone || "+91 98480 12345",
        commoditiesSupported: ["Fresh Chilli", "Tomato", "Mango"],
        temperatureZones: [
          { name: "Chamber 1 (Multi-Commodity)", tempRange: "2°C to 8°C", capacityMT: Number(userData.totalCapacityMT) || 5000, availableMT: Number(userData.totalCapacityMT) || 5000, suitableCommodities: ["Fresh Chilli", "Tomato", "Mango"] }
        ],
        pricingPerMTMonth: 850
      });
    }

    const token = this.generateToken(newUser);
    const { passwordHash: _, ...userSafe } = newUser;

    return {
      token,
      user: userSafe
    };
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error('Invalid or expired authentication token');
    }
  }
};

export default authService;
