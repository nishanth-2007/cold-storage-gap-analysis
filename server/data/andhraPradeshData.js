// Authoritative Andhra Pradesh Administrative & Horticulture GIS Dataset
// State: Andhra Pradesh (Fixed)
// Contains: 26 Districts (post-reorganization), Mandals, Major Horticulture Villages,
// Crop Production Benchmarks (Directorate of Horticulture AP / NHB / NCCD),
// Registered Cold Storages & APMC Markets.

export const AP_STATE = "Andhra Pradesh";

export const AP_DISTRICTS_DATA = [
  {
    name: "Guntur",
    code: "GNT",
    headquarters: "Guntur",
    centroid: [16.3067, 80.4365],
    bounds: [[15.8, 79.9], [16.6, 80.8]],
    areaSqKm: 2443,
    horticultureAcreageHa: 142000,
    primaryCrops: ["Fresh Chilli", "Turmeric", "Banana", "Tomato"],
    mandals: [
      { name: "Guntur Urban", villages: ["Guntur City", "Nallapadu", "Pedakakani"] },
      { name: "Duggirala", villages: ["Duggirala Village", "Manchenapalli", "Chintalapudi"] },
      { name: "Tenali", villages: ["Tenali Rural", "Angalakuduru", "Kolanukonda"] },
      { name: "Mangalagiri", villages: ["Mangalagiri Town", "Atmakur", "Nowlur"] },
      { name: "Prathipadu", villages: ["Prathipadu Village", "Kondapadu", "Enamadala"] },
      { name: "Tadikonda", villages: ["Tadikonda Village", "Lam", "Ponnekallu"] }
    ]
  },
  {
    name: "Palnadu",
    code: "PLN",
    headquarters: "Narasaraopet",
    centroid: [16.2354, 80.0494],
    bounds: [[15.8, 79.4], [16.7, 80.3]],
    areaSqKm: 7298,
    horticultureAcreageHa: 118000,
    primaryCrops: ["Fresh Chilli", "Tomato", "Lime", "Papaya"],
    mandals: [
      { name: "Narasaraopet", villages: ["Narasaraopet Rural", "Prakash Nagar", "Ravipadu"] },
      { name: "Chilakaluripet", villages: ["Chilakaluripet Town", "Purushothapatnam", "Pasumarru"] },
      { name: "Vinukonda", villages: ["Vinukonda Town", "Vittalam", "Nadigadda"] },
      { name: "Sattenapalle", villages: ["Sattenapalle Rural", "Dhulipalla", "Panidem"] },
      { name: "Macherla", villages: ["Macherla Rural", "Kambampadu", "Nagulavaram"] }
    ]
  },
  {
    name: "Bapatla",
    code: "BPT",
    headquarters: "Bapatla",
    centroid: [15.9042, 80.4674],
    bounds: [[15.6, 80.0], [16.2, 80.7]],
    areaSqKm: 3829,
    horticultureAcreageHa: 64000,
    primaryCrops: ["Banana", "Fresh Chilli", "Cashew", "Vegetables"],
    mandals: [
      { name: "Bapatla", villages: ["Bapatla Rural", "Appikatla", "Karlapalem"] },
      { name: "Chirala", villages: ["Chirala Rural", "Vetapalem", "Karamchedu"] },
      { name: "Repalle", villages: ["Repalle Rural", "Isukapalli", "Peteru"] },
      { name: "Addanki", villages: ["Addanki Town", "Chinakothapalli", "Nagambhotlavaripalem"] }
    ]
  },
  {
    name: "Krishna",
    code: "KRI",
    headquarters: "Machilipatnam",
    centroid: [16.1809, 81.1303],
    bounds: [[15.9, 80.7], [16.5, 81.4]],
    areaSqKm: 3775,
    horticultureAcreageHa: 98000,
    primaryCrops: ["Mango", "Banana", "Guava", "Vegetables"],
    mandals: [
      { name: "Machilipatnam", villages: ["Machilipatnam Port", "Chilakalapudi", "Arisepalli"] },
      { name: "Gudivada", villages: ["Gudivada Rural", "Billapadu", "Valivartipadu"] },
      { name: "Vuyyuru", villages: ["Vuyyuru Town", "Katuru", "Mudunuru"] },
      { name: "Avanigadda", villages: ["Avanigadda Village", "Nagayalanka", "Koduru"] },
      { name: "Nuzvid", villages: ["Nuzvid Town", "Hanuman Junction", "Borragudem"] }
    ]
  },
  {
    name: "NTR",
    code: "NTR",
    headquarters: "Vijayawada",
    centroid: [16.5062, 80.6480],
    bounds: [[16.3, 80.3], [17.1, 80.9]],
    areaSqKm: 3316,
    horticultureAcreageHa: 104000,
    primaryCrops: ["Mango", "Fresh Chilli", "Tomato", "Papaya"],
    mandals: [
      { name: "Vijayawada Urban", villages: ["Bhavanipuram", "Gunadala", "Gollapudi"] },
      { name: "Vijayawada Rural", villages: ["Nunna", "Enikepadu", "Payakapuram"] },
      { name: "Mylavaram", villages: ["Mylavaram Town", "Pulluru", "Chandrala"] },
      { name: "Tiruvuru", villages: ["Tiruvuru Rural", "Rolupadi", "Kokilampadu"] },
      { name: "Jaggayyapeta", villages: ["Jaggayyapeta Town", "Chillakallu", "Shermohamedpet"] },
      { name: "Nandigama", villages: ["Nandigama Rural", "Ithavaram", "Kancherla"] }
    ]
  },
  {
    name: "Chittoor",
    code: "CTR",
    headquarters: "Chittoor",
    centroid: [13.2172, 79.1003],
    bounds: [[13.0, 78.8], [13.6, 79.5]],
    areaSqKm: 6855,
    horticultureAcreageHa: 156000,
    primaryCrops: ["Mango", "Tomato", "Banana", "Papaya"],
    mandals: [
      { name: "Chittoor", villages: ["Chittoor Rural", "Murakambattu", "Gudipala"] },
      { name: "Palamaner", villages: ["Palamaner Town", "Baireddipalle", "Kurmai"] },
      { name: "Kuppam", villages: ["Kuppam Town", "Gudupalle", "Rallabuduguru"] },
      { name: "Bangarupalem", villages: ["Bangarupalem Village", "Mogili", "Ragimanupenta"] },
      { name: "Nagari", villages: ["Nagari Town", "Ekambarakuppam", "Vadamalapeta"] }
    ]
  },
  {
    name: "Tirupati",
    code: "TPT",
    headquarters: "Tirupati",
    centroid: [13.6288, 79.4192],
    bounds: [[13.3, 79.1], [14.1, 80.1]],
    areaSqKm: 8231,
    horticultureAcreageHa: 124000,
    primaryCrops: ["Mango", "Lime", "Tomato", "Cashew"],
    mandals: [
      { name: "Tirupati Urban", villages: ["Tirupati City", "Renigunta", "Settipalli"] },
      { name: "Chandragiri", villages: ["Chandragiri Town", "A-Rangampet", "Panapakam"] },
      { name: "Srikalahasti", villages: ["Srikalahasti Rural", "Yerpedu", "Thottambedu"] },
      { name: "Gudur", villages: ["Gudur Rural", "Chillakur", "Kota"] },
      { name: "Sullurpeta", villages: ["Sullurpeta Town", "Tada", "Doravarisatram"] },
      { name: "Venkatagiri", villages: ["Venkatagiri Town", "Balayapalli", "Dakkili"] }
    ]
  },
  {
    name: "Annamayya",
    code: "AMM",
    headquarters: "Rayachoti",
    centroid: [14.0531, 78.7521],
    bounds: [[13.6, 78.2], [14.4, 79.2]],
    areaSqKm: 7954,
    horticultureAcreageHa: 172000,
    primaryCrops: ["Tomato", "Mango", "Papaya", "Banana"],
    mandals: [
      { name: "Madanapalle", villages: ["Madanapalle Rural", "Basinikonda", "Kollabylu", "Ponnetipalem"] },
      { name: "Rayachoti", villages: ["Rayachoti Rural", "Sambepalli", "Galiveedu"] },
      { name: "Rajampet", villages: ["Rajampet Town", "Nandalur", "Pullampeta"] },
      { name: "Pileru", villages: ["Pileru Town", "Kalikiri", "Valmikipuram"] },
      { name: "Tamballapalle", villages: ["Tamballapalle Village", "B.Kothakota", "Molakalacheruvu"] }
    ]
  },
  {
    name: "Ananthapuramu",
    code: "ATP",
    headquarters: "Ananthapuramu",
    centroid: [14.6819, 77.6006],
    bounds: [[14.3, 76.9], [15.2, 78.1]],
    areaSqKm: 10205,
    horticultureAcreageHa: 189000,
    primaryCrops: ["Sweet Orange", "Banana", "Pomegranate", "Papaya"],
    mandals: [
      { name: "Ananthapuramu", villages: ["Anantapur Rural", "Kuderu", "Atmakur"] },
      { name: "Guntakal", villages: ["Guntakal Town", "Kasapuram", "Nakkanadoddi"] },
      { name: "Tadipatri", villages: ["Tadipatri Rural", "Yadiki", "Peddapappur"] },
      { name: "Uravakonda", villages: ["Uravakonda Town", "Beluguppa", "Vidapanakal"] },
      { name: "Kalyandurg", villages: ["Kalyandurg Town", "Brahmasamudram", "Settur"] }
    ]
  },
  {
    name: "Sri Sathya Sai",
    code: "SSS",
    headquarters: "Puttaparthi",
    centroid: [14.1672, 77.8118],
    bounds: [[13.7, 76.8], [14.5, 78.3]],
    areaSqKm: 8925,
    horticultureAcreageHa: 145000,
    primaryCrops: ["Sweet Orange", "Mango", "Pomegranate", "Banana"],
    mandals: [
      { name: "Puttaparthi", villages: ["Puttaparthi Rural", "Bukkapatnam", "Kothacheruvu"] },
      { name: "Dharmavaram", villages: ["Dharmavaram Rural", "Bathalapalli", "Tadimarri"] },
      { name: "Kadiri", villages: ["Kadiri Town", "Gandlapenta", "Nallamada"] },
      { name: "Hindupur", villages: ["Hindupur Rural", "Lepakshi", "Chilamathur"] },
      { name: "Penukonda", villages: ["Penukonda Town", "Roddam", "Somandepalle"] }
    ]
  },
  {
    name: "Kurnool",
    code: "KNL",
    headquarters: "Kurnool",
    centroid: [15.8281, 78.0373],
    bounds: [[15.4, 76.9], [16.2, 78.5]],
    areaSqKm: 7980,
    horticultureAcreageHa: 168000,
    primaryCrops: ["Fresh Chilli", "Tomato", "Banana", "Sweet Orange"],
    mandals: [
      { name: "Kurnool Urban", villages: ["Kurnool City", "Gargeyapuram", "Joharapuram"] },
      { name: "Kurnool Rural", villages: ["Nannur", "Ulchala", "Munagalapadu"] },
      { name: "Adoni", villages: ["Adoni Rural", "Pedda Harivanam", "Mandagiri"] },
      { name: "Yemmiganur", villages: ["Yemmiganur Town", "Gonegandla", "Nandavaram"] },
      { name: "Kodumur", villages: ["Kodumur Village", "Laddagiri", "Gorantla"] },
      { name: "Pattikonda", villages: ["Pattikonda Town", "Tuggali", "Devanakonda"] }
    ]
  },
  {
    name: "Nandyal",
    code: "NDL",
    headquarters: "Nandyal",
    centroid: [15.4786, 78.4836],
    bounds: [[14.9, 78.0], [16.0, 79.1]],
    areaSqKm: 9682,
    horticultureAcreageHa: 135000,
    primaryCrops: ["Sweet Orange", "Banana", "Turmeric", "Fresh Chilli"],
    mandals: [
      { name: "Nandyal", villages: ["Nandyal Rural", "Chabolu", "Polur"] },
      { name: "Allagadda", villages: ["Allagadda Town", "Rudravaram", "Chagalamarri"] },
      { name: "Banaganapalle", villages: ["Banaganapalle Town", "Koilkuntla", "Owk"] },
      { name: "Atmakur", villages: ["Atmakur Town", "Velgode", "Pamulapadu"] },
      { name: "Dhone", villages: ["Dhone Town", "Bethamcherla", "Peapally"] }
    ]
  },
  {
    name: "YSR Kadapa",
    code: "KDP",
    headquarters: "Kadapa",
    centroid: [14.4673, 78.8242],
    bounds: [[14.1, 78.1], [15.0, 79.4]],
    areaSqKm: 11228,
    horticultureAcreageHa: 162000,
    primaryCrops: ["Banana", "Papaya", "Sweet Orange", "Turmeric"],
    mandals: [
      { name: "Kadapa", villages: ["Kadapa City", "Utukur", "Ramanjaneyapuram"] },
      { name: "Proddatur", villages: ["Proddatur Town", "Modameedapalle", "Bollavaram"] },
      { name: "Pulivendula", villages: ["Pulivendula Town", "Vempalli", "Lingala"] },
      { name: "Jammalamadugu", villages: ["Jammalamadugu Town", "Muddanur", "Mylavaram"] },
      { name: "Badvel", villages: ["Badvel Town", "Porumamilla", "Atlur"] },
      { name: "Mydukur", villages: ["Mydukur Town", "Duvvur", "Chapad"] }
    ]
  },
  {
    name: "Prakasam",
    code: "PKM",
    headquarters: "Ongole",
    centroid: [15.5057, 80.0499],
    bounds: [[14.9, 79.0], [16.1, 80.4]],
    areaSqKm: 14322,
    horticultureAcreageHa: 132000,
    primaryCrops: ["Fresh Chilli", "Tomato", "Sweet Orange", "Cashew"],
    mandals: [
      { name: "Ongole", villages: ["Ongole Rural", "Pelluru", "Mukthinuthalapadu"] },
      { name: "Markapur", villages: ["Markapur Town", "Dornala", "Tarlupadu"] },
      { name: "Giddalur", villages: ["Giddalur Town", "Komarolu", "Cumbum"] },
      { name: "Kanigiri", villages: ["Kanigiri Town", "Pamur", "Veligandla"] },
      { name: "Kandukur", villages: ["Kandukur Town", "Singarayakonda", "Ulavapadu"] }
    ]
  },
  {
    name: "Sri Potti Sriramulu Nellore",
    code: "NLR",
    headquarters: "Nellore",
    centroid: [14.4426, 79.9865],
    bounds: [[14.0, 79.5], [15.2, 80.3]],
    areaSqKm: 10441,
    horticultureAcreageHa: 110000,
    primaryCrops: ["Acid Lime", "Cashew", "Papaya", "Vegetables"],
    mandals: [
      { name: "Nellore Urban", villages: ["Nellore City", "Kallurpalli", "Dargamitta"] },
      { name: "Nellore Rural", villages: ["South Mopuru", "Ambapuram", "Akkacheruvupadu"] },
      { name: "Kovur", villages: ["Kovur Town", "Inamadugu", "Padugupadu"] },
      { name: "Kavali", villages: ["Kavali Rural", "Musunur", "Maddurupadu"] },
      { name: "Podalakur", villages: ["Podalakur Town", "Manubolu", "Kaluvoya"] }
    ]
  },
  {
    name: "East Godavari",
    code: "EGD",
    headquarters: "Rajahmundry",
    centroid: [17.0005, 81.8040],
    bounds: [[16.6, 81.4], [17.4, 82.2]],
    areaSqKm: 2561,
    horticultureAcreageHa: 115000,
    primaryCrops: ["Banana", "Cashew", "Mango", "Cocoa"],
    mandals: [
      { name: "Rajahmundry Urban", villages: ["Rajahmundry City", "Morampudi", "Kateru"] },
      { name: "Rajahmundry Rural", villages: ["Hukumpeta", "Torredu", "Bommur"] },
      { name: "Kovvur", villages: ["Kovvur Town", "Dommeru", "Nidadavole"] },
      { name: "Korukonda", villages: ["Korukonda Village", "Gokavaram", "Rajanagaram"] }
    ]
  },
  {
    name: "Kakinada",
    code: "KKD",
    headquarters: "Kakinada",
    centroid: [16.9891, 82.2475],
    bounds: [[16.7, 81.9], [17.4, 82.6]],
    areaSqKm: 3019,
    horticultureAcreageHa: 89000,
    primaryCrops: ["Banana", "Cashew", "Mango", "Vegetables"],
    mandals: [
      { name: "Kakinada Urban", villages: ["Kakinada Port", "Sarpavaram", "Suryaraopeta"] },
      { name: "Samalkota", villages: ["Samalkota Town", "Peddapuram", "G.Ragampeta"] },
      { name: "Pithapuram", villages: ["Pithapuram Town", "Gollaprolu", "U.Kothapalli"] },
      { name: "Tuni", villages: ["Tuni Town", "Kotananduru", "Payakaraopeta Border"] }
    ]
  },
  {
    name: "Dr. B.R. Ambedkar Konaseema",
    code: "KNS",
    headquarters: "Amalapuram",
    centroid: [16.5787, 82.0061],
    bounds: [[16.3, 81.6], [16.9, 82.3]],
    areaSqKm: 2083,
    horticultureAcreageHa: 96000,
    primaryCrops: ["Banana", "Cashew", "Papaya", "Vegetables"],
    mandals: [
      { name: "Amalapuram", villages: ["Amalapuram Rural", "Bhatnavilli", "Bandarulanka"] },
      { name: "Ravulapalem", villages: ["Ravulapalem Town", "Kothapeta", "Devarapalle"] },
      { name: "Razole", villages: ["Razole Village", "Sakhinetipalli", "Malikipuram"] },
      { name: "Ramachandrapuram", villages: ["Ramachandrapuram Town", "Draksharamam", "Rayavaram"] }
    ]
  },
  {
    name: "West Godavari",
    code: "WGD",
    headquarters: "Bhimavaram",
    centroid: [16.5449, 81.5212],
    bounds: [[16.2, 81.2], [16.9, 81.9]],
    areaSqKm: 2178,
    horticultureAcreageHa: 87000,
    primaryCrops: ["Banana", "Guava", "Cocoa", "Vegetables"],
    mandals: [
      { name: "Bhimavaram", villages: ["Bhimavaram Town", "Rayalam", "Chinna Amiram"] },
      { name: "Tanuku", villages: ["Tanuku Rural", "Tetali", "Velpur"] },
      { name: "Narasapuram", villages: ["Narasapuram Port", "Palakollu", "Mogalthur"] },
      { name: "Tadepalligudem", villages: ["Tadepalligudem Rural", "Pentapadu", "Apparaopet"] }
    ]
  },
  {
    name: "Eluru",
    code: "ELR",
    headquarters: "Eluru",
    centroid: [16.7107, 81.0952],
    bounds: [[16.4, 80.8], [17.4, 81.6]],
    areaSqKm: 6679,
    horticultureAcreageHa: 138000,
    primaryCrops: ["Oil Palm", "Cocoa", "Banana", "Mango"],
    mandals: [
      { name: "Eluru Urban", villages: ["Eluru City", "Sanivarapupeta", "Tangellamudi"] },
      { name: "Jangareddigudem", villages: ["Jangareddigudem Town", "Chintalapudi", "Kamavarapukota"] },
      { name: "Nuzvid Border", villages: ["Agiripalli", "Musunuru", "Bapulapadu"] },
      { name: "Denduluru", villages: ["Denduluru Village", "Bhimadole", "Pedavegi"] }
    ]
  },
  {
    name: "Visakhapatnam",
    code: "VSP",
    headquarters: "Visakhapatnam",
    centroid: [17.6868, 83.2185],
    bounds: [[17.5, 83.0], [18.0, 83.5]],
    areaSqKm: 1048,
    horticultureAcreageHa: 48000,
    primaryCrops: ["Vegetables", "Cashew", "Papaya", "Banana"],
    mandals: [
      { name: "Visakhapatnam Urban", villages: ["Gajuwaka", "Madhurawada", "Pendurthi"] },
      { name: "Bheemunipatnam", villages: ["Bheemunipatnam Town", "Tagarapuvalasa", "Kapuluppada"] },
      { name: "Anandapuram", villages: ["Anandapuram Village", "Padmanabham", "Vemulavalasa"] }
    ]
  },
  {
    name: "Anakapalli",
    code: "AKP",
    headquarters: "Anakapalli",
    centroid: [17.6913, 83.0039],
    bounds: [[17.3, 82.4], [18.1, 83.2]],
    areaSqKm: 4292,
    horticultureAcreageHa: 92000,
    primaryCrops: ["Tomato", "Cashew", "Mango", "Vegetables"],
    mandals: [
      { name: "Anakapalli", villages: ["Anakapalli Town", "Thummapala", "Kasimkota"] },
      { name: "Chodavaram", villages: ["Chodavaram Town", "K.Kotapadu", "Madugula"] },
      { name: "Elamanchili", villages: ["Elamanchili Town", "Rambilli", "Atchutapuram"] },
      { name: "Narsipatnam", villages: ["Narsipatnam Town", "Rolugunta", "Golugonda"] }
    ]
  },
  {
    name: "Alluri Sitharama Raju",
    code: "ASR",
    headquarters: "Paderu",
    centroid: [18.0833, 82.6667],
    bounds: [[17.4, 81.5], [18.6, 83.0]],
    areaSqKm: 12251,
    horticultureAcreageHa: 84000,
    primaryCrops: ["Coffee", "Turmeric", "Ginger", "Black Pepper"],
    mandals: [
      { name: "Paderu", villages: ["Paderu Town", "Hukumpeta", "G.Madugula"] },
      { name: "Araku Valley", villages: ["Araku Village", "Dumbriguda", "Ananthagiri"] },
      { name: "Chintapalle", villages: ["Chintapalle Town", "G.K.Veedhi", "Koyyuru"] },
      { name: "Rampachodavaram", villages: ["Rampachodavaram Village", "Maredumilli", "Devipatnam"] }
    ]
  },
  {
    name: "Vizianagaram",
    code: "VZM",
    headquarters: "Vizianagaram",
    centroid: [18.1133, 83.3956],
    bounds: [[17.8, 83.0], [18.5, 83.7]],
    areaSqKm: 4122,
    horticultureAcreageHa: 102000,
    primaryCrops: ["Mango", "Cashew", "Tomato", "Banana"],
    mandals: [
      { name: "Vizianagaram", villages: ["Vizianagaram Rural", "Dharmapuri", "Gunkalam"] },
      { name: "Gajapathinagaram", villages: ["Gajapathinagaram Town", "Bondapalle", "Gantyada"] },
      { name: "Bobbili", villages: ["Bobbili Town", "Badangi", "Therlam"] },
      { name: "Cheepurupalle", villages: ["Cheepurupalle Town", "Garividi", "Merakamudidam"] }
    ]
  },
  {
    name: "Parvathipuram Manyam",
    code: "PVM",
    headquarters: "Parvathipuram",
    centroid: [18.7758, 83.4278],
    bounds: [[18.4, 83.1], [19.1, 83.9]],
    areaSqKm: 3659,
    horticultureAcreageHa: 68000,
    primaryCrops: ["Cashew", "Mango", "Banana", "Turmeric"],
    mandals: [
      { name: "Parvathipuram", villages: ["Parvathipuram Rural", "Seethanagaram", "Balijipeta"] },
      { name: "Salur", villages: ["Salur Town", "Pachipenta", "Makkuva"] },
      { name: "Palakonda", villages: ["Palakonda Town", "Veeraghattam", "Seethampeta"] },
      { name: "Kurupam", villages: ["Kurupam Village", "Jiyyammavalasa", "Komarada"] }
    ]
  },
  {
    name: "Srikakulam",
    code: "SKL",
    headquarters: "Srikakulam",
    centroid: [18.2969, 83.8968],
    bounds: [[18.1, 83.6], [19.2, 84.8]],
    areaSqKm: 5837,
    horticultureAcreageHa: 112000,
    primaryCrops: ["Cashew", "Banana", "Mango", "Tomato"],
    mandals: [
      { name: "Srikakulam", villages: ["Srikakulam Rural", "Singupuram", "Khazipeta"] },
      { name: "Amadalavalasa", villages: ["Amadalavalasa Town", "Ponduru", "Sarubujjili"] },
      { name: "Tekkali", villages: ["Tekkali Town", "Nandigam", "Kotabommali"] },
      { name: "Palasa-Kasibugga", villages: ["Palasa Town", "Vajrapukotturu", "Meliaputti"] },
      { name: "Sompeta", villages: ["Sompeta Town", "Kanchili", "Kaviti"] }
    ]
  }
];

// Major Horticulture Crops in Andhra Pradesh with perishability and temperature guidelines
export const AP_HORTICULTURE_CROPS = [
  {
    name: "Fresh Chilli",
    scientificName: "Capsicum annuum (Fresh Green/Red)",
    category: "Vegetable",
    tempRange: "7°C to 10°C",
    minTempC: 7,
    maxTempC: 10,
    humidityRange: "90% - 95%",
    perishabilityDays: 28,
    coldStorageRequirementPct: 55,
    peakHarvest: ["January", "February", "March", "April", "May"],
    majorDistricts: ["Guntur", "Palnadu", "Prakasam", "Kurnool", "NTR"],
    avgYieldMTPerHa: 12.5
  },
  {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    category: "Vegetable",
    tempRange: "10°C to 13°C",
    minTempC: 10,
    maxTempC: 13,
    humidityRange: "85% - 90%",
    perishabilityDays: 14,
    coldStorageRequirementPct: 40,
    peakHarvest: ["December", "January", "February", "July", "August"],
    majorDistricts: ["Annamayya", "Chittoor", "Kurnool", "Palnadu", "Anakapalli"],
    avgYieldMTPerHa: 28.5
  },
  {
    name: "Mango",
    scientificName: "Mangifera indica",
    category: "Fruit",
    tempRange: "10°C to 13°C",
    minTempC: 10,
    maxTempC: 13,
    humidityRange: "85% - 90%",
    perishabilityDays: 28,
    coldStorageRequirementPct: 35,
    peakHarvest: ["April", "May", "June"],
    majorDistricts: ["Krishna", "NTR", "Chittoor", "Tirupati", "Annamayya", "Vizianagaram"],
    avgYieldMTPerHa: 9.2
  },
  {
    name: "Banana",
    scientificName: "Musa acuminata",
    category: "Fruit",
    tempRange: "13°C to 15°C",
    minTempC: 13,
    maxTempC: 15,
    humidityRange: "90% - 95%",
    perishabilityDays: 21,
    coldStorageRequirementPct: 30,
    peakHarvest: ["All Year Round", "Peak: August-December"],
    majorDistricts: ["YSR Kadapa", "Ananthapuramu", "East Godavari", "West Godavari", "Guntur"],
    avgYieldMTPerHa: 52.0
  },
  {
    name: "Sweet Orange",
    scientificName: "Citrus sinensis",
    category: "Fruit",
    tempRange: "5°C to 8°C",
    minTempC: 5,
    maxTempC: 8,
    humidityRange: "85% - 90%",
    perishabilityDays: 60,
    coldStorageRequirementPct: 45,
    peakHarvest: ["November", "December", "January", "February"],
    majorDistricts: ["Ananthapuramu", "YSR Kadapa", "Sri Sathya Sai", "Nandyal"],
    avgYieldMTPerHa: 14.5
  },
  {
    name: "Turmeric",
    scientificName: "Curcuma longa",
    category: "Spice",
    tempRange: "10°C to 15°C",
    minTempC: 10,
    maxTempC: 15,
    humidityRange: "60% - 70%",
    perishabilityDays: 270,
    coldStorageRequirementPct: 55,
    peakHarvest: ["February", "March", "April"],
    majorDistricts: ["Guntur", "YSR Kadapa", "Nandyal", "Alluri Sitharama Raju"],
    avgYieldMTPerHa: 6.2
  },
  {
    name: "Papaya",
    scientificName: "Carica papaya",
    category: "Fruit",
    tempRange: "10°C to 12°C",
    minTempC: 10,
    maxTempC: 12,
    humidityRange: "85% - 90%",
    perishabilityDays: 18,
    coldStorageRequirementPct: 35,
    peakHarvest: ["All Year Round"],
    majorDistricts: ["Annamayya", "YSR Kadapa", "Ananthapuramu", "Chittoor"],
    avgYieldMTPerHa: 48.0
  },
  {
    name: "Acid Lime",
    scientificName: "Citrus aurantiifolia",
    category: "Fruit",
    tempRange: "8°C to 10°C",
    minTempC: 8,
    maxTempC: 10,
    humidityRange: "85% - 90%",
    perishabilityDays: 45,
    coldStorageRequirementPct: 40,
    peakHarvest: ["June", "July", "August", "September"],
    majorDistricts: ["Sri Potti Sriramulu Nellore", "Tirupati", "Palnadu"],
    avgYieldMTPerHa: 12.0
  }
];

// Official Data Sources
export const AP_DATA_SOURCES = [
  {
    id: "ds-01",
    datasetName: "Andhra Pradesh Horticulture Statistics (Area & Production)",
    issuingAgency: "Department of Horticulture, Govt. of Andhra Pradesh",
    officialPortal: "https://horticulture.ap.gov.in",
    coverage: "All 26 Districts of Andhra Pradesh",
    updateFrequency: "Quarterly & Annual (Final Estimates)",
    sourceType: "Government",
    sourceLastUpdated: "2025-08-15",
    lastVerified: "2026-03-10",
    reliabilityScore: "98%",
    verificationProtocol: "Cross-checked with Directorate of Economics and Statistics (DES) AP"
  },
  {
    id: "ds-02",
    datasetName: "National Cold-chain Development (NCCD) Cold Storage Census",
    issuingAgency: "National Centre for Cold-chain Development, Ministry of Agriculture",
    officialPortal: "https://nccd.gov.in",
    coverage: "Licensed Cold Storage Facilities in Andhra Pradesh",
    updateFrequency: "Biannual",
    sourceType: "Government",
    sourceLastUpdated: "2025-11-20",
    lastVerified: "2026-02-18",
    reliabilityScore: "95%",
    verificationProtocol: "FSSAI & AP State Warehouse Regulatory Board verification"
  },
  {
    id: "ds-03",
    datasetName: "APMC Mandi Daily Influx & Modal Prices (e-NAM AP)",
    issuingAgency: "Andhra Pradesh Agricultural Marketing Board (APAMB) / e-NAM",
    officialPortal: "https://market.ap.nic.in",
    coverage: "68 Regulated Agricultural Market Committees across AP",
    updateFrequency: "Daily (Trading Days)",
    sourceType: "Government",
    sourceLastUpdated: "2026-09-27",
    lastVerified: "2026-09-27",
    reliabilityScore: "99%",
    verificationProtocol: "Direct APMC yard physical electronic auction logs"
  },
  {
    id: "ds-04",
    datasetName: "Owner-Reported Live Facility Occupancy Stream",
    issuingAgency: "Cold Storage Warehouse Operators Consortium of AP",
    officialPortal: "AP Cold Chain Portal (Self-Service Tier)",
    coverage: "Private & Cooperative Cold Storage Facilities in AP",
    updateFrequency: "Live / Daily by Facility Managers",
    sourceType: "Owner Provided",
    sourceLastUpdated: "2026-09-27",
    lastVerified: "2026-09-27",
    reliabilityScore: "92%",
    verificationProtocol: "OTP-verified warehouse gate operator check-in with weekly audit"
  },
  {
    id: "ds-05",
    datasetName: "GIS Spatial Storage Gap & Buffer Deficit Model",
    issuingAgency: "Cold Storage Gap Mapping Platform GIS Core",
    officialPortal: "Internal Geo-Processing Engine (AP Spatial Grid)",
    coverage: "26 Districts, 679 Mandals of Andhra Pradesh",
    updateFrequency: "Dynamic / On Parameter Shift",
    sourceType: "Platform Calculated",
    sourceLastUpdated: "2026-09-27",
    lastVerified: "2026-09-27",
    reliabilityScore: "94%",
    verificationProtocol: "Haversine & OSRM road distance matrix vs perishable harvest volume"
  },
  {
    id: "ds-06",
    datasetName: "Demonstration & Simulated Operational Pilot Metrics",
    issuingAgency: "AP AgriTech R&D Sandbox",
    officialPortal: "Synthetic Test Bench",
    coverage: "Auxiliary cluster simulations",
    updateFrequency: "Continuous",
    sourceType: "Demo Data",
    sourceLastUpdated: "2026-09-27",
    lastVerified: "2026-09-27",
    reliabilityScore: "85%",
    verificationProtocol: "Clearly marked in UI as synthetic demo scenario"
  }
];
