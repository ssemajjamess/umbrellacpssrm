// Mock data for Umbrella CRM based on current customer spreadsheet

// Insurance Companies
export const insuranceCompanies = [
  'ALLSTATE',
  'AMERICAN FAMILY',
  'FARM BUREAU',
  'FARMERS',
  'FOREMOST',
  'GEICO',
  'HARTFORD',
  'HOMEFIRST AGENCY',
  'HORACE MANN',
  'THE GENERAL',
  'KEMPER',
  'NATIONWIDE',
  'PROGRESSIVE',
  'SAGESURE',
  'STATEFARM',
  'SAFECO',
  'TRAVELERS',
  'UNIVERSAL CASUALTY',
  'USAA'
];

// Sales Representatives
export const salesReps = [
  'James Causey',
  'Daniel Pruiksma'
];

// Job Stages
export const jobStages = [
  'LEAD',
  'WAIITING ADJUSTMENT',
  'WAITING INS SCOPE',
  'READY TO INSTALL',
  'INVOICED WPAYMENT',
  'CLOSED-W NEW ROOF',
  'CLOSED-DEAD DENIED',
  'WAITING FEE'
];

// Fee Status Options
export const feeStatusOptions = [
  'N/A',
  'YES! :)',
  'NO',
  'PENDING'
];

// Roof Types
export const roofTypes = [
  'ASPHALT 30 YEAR',
  'ASPHALT 25 YEAR',
  'ASPHALT 20 YEAR',
  'METAL',
  'TILE',
  'WOOD SHAKE',
  'SLATE',
  'OTHER'
];

// Property Types
export const propertyTypes = [
  'RESIDENTIAL',
  'COMMERCIAL',
  'MIXED USE'
];

// Replacement Types
export const replacementTypes = [
  'FULL REPLACEMENT',
  'LAYOVER',
  'PARTIAL REPLACEMENT',
  'REPAIR'
];

// Crews
export const crews = [
  'BROM ROOFING',
  'UMBRELLA CREW 1',
  'UMBRELLA CREW 2',
  'CONTRACTOR A',
  'CONTRACTOR B'
];

// Google Rating Options
export const googleRatingOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  'N/A',
  'PENDING'
];

// Current Customer Data
export const currentCustomers = [
  {
    id: 1,
    soldBy: 'James Causey',
    customerName: 'Enrique and Viviana Guzman',
    phone: '(864) 626-7669',
    email: 'enriqueguzman13@gmail.com',
    address: '18 Avice Dale Dr, Greenville, SC 29611',
    stage: 'CLOSED-W NEW ROOF',
    feePaid: 'YES! :)',
    insuranceCompany: 'SAGESURE',
    dateOfLoss: '2024-05-06',
    claimFiled: 'YES',
    claimNumber: 'HO2025931371099',
    approved: 'YES! :)',
    adjustersInfo: 'Grahm Whitley 864-359-3528',
    replacementType: 'FULL REPLACEMENT',
    roofType: 'ASPHALT 30 YEAR',
    propertyType: 'RESIDENTIAL',
    crew: 'BROM ROOFING',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: 'send link for Google review',
    jobDocumentsLink: 'https://drive.google.com'
  },
  {
    id: 2,
    soldBy: 'Daniel Pruiksma',
    customerName: 'James & Brenda Alexander',
    phone: '(864) 555-1234',
    email: 'ajtabga@aol.com',
    address: '603 Wilderness Trail, Liberty, SC 29657',
    stage: 'WAITING INS SCOPE',
    feePaid: 'N/A',
    insuranceCompany: 'FARM BUREAU',
    dateOfLoss: '2024-05-02',
    claimFiled: 'YES',
    claimNumber: '39P02418095',
    approved: '',
    adjustersInfo: 'Tina Staley',
    replacementType: 'LAYOVER',
    roofType: 'ASPHALT 30 YEAR',
    propertyType: 'RESIDENTIAL',
    crew: '',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: 'She has been sent quote and we are waiting on contact',
    jobDocumentsLink: ''
  },
  {
    id: 3,
    soldBy: 'James Causey',
    customerName: 'Russell Brendel',
    phone: '(864) 555-5678',
    email: 'Tonstric@bellsouth.net',
    address: '108 Arizona Rd Easley Sc 29642',
    stage: 'WAIITING ADJUSTMENT',
    feePaid: 'N/A',
    insuranceCompany: 'ALLSTATE',
    dateOfLoss: '2024-05-05',
    claimFiled: 'YES',
    claimNumber: '0799622716',
    approved: '',
    adjustersInfo: 'ADJUSTERS INFO:',
    replacementType: 'FULL REPLACEMENT',
    roofType: 'ASPHALT 30 YEAR',
    propertyType: 'RESIDENTIAL',
    crew: '',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: 'Need to talk to mr.',
    jobDocumentsLink: ''
  },
  {
    id: 4,
    soldBy: 'Daniel Pruiksma',
    customerName: 'Corey Craft',
    phone: 'H(864)-616-8469 W(864) 404-5637',
    email: 'None',
    address: '123 Main St, Greenville, SC 29601',
    stage: 'WAITING FEE',
    feePaid: 'N/A',
    insuranceCompany: 'FOREMOST',
    dateOfLoss: '2024-05-01',
    claimFiled: 'YES',
    claimNumber: '7009185250-1',
    approved: '',
    adjustersInfo: 'ADJUSTERS INFO:',
    replacementType: 'LAYOVER',
    roofType: 'ASPHALT 30 YEAR',
    propertyType: 'RESIDENTIAL',
    crew: '',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: 'Need to touch base with mrs',
    jobDocumentsLink: ''
  },
  {
    id: 5,
    soldBy: 'James Causey',
    customerName: 'John Smith',
    phone: '(864) 555-9999',
    email: 'johnsmith@email.com',
    address: '456 Oak Ave, Greenville, SC 29605',
    stage: 'LEAD',
    feePaid: 'N/A',
    insuranceCompany: 'HOMEFIRST AGENCY',
    dateOfLoss: '2024-05-03',
    claimFiled: 'YES',
    claimNumber: '202524692',
    approved: '',
    adjustersInfo: 'ADJUSTERS INFO:',
    replacementType: 'FULL REPLACEMENT',
    roofType: 'ASPHALT 30 YEAR',
    propertyType: 'RESIDENTIAL',
    crew: '',
    jobCost: 0,
    laborCost: 0,
    materialCost: 0,
    googleRating: 'PENDING',
    jobNotes: 'Need window quote for 9 windows 3 of',
    jobDocumentsLink: ''
  }
];

// Stage colors for UI
export const stageColors = {
  'LEAD': 'bg-yellow-100 text-yellow-800',
  'WAIITING ADJUSTMENT': 'bg-orange-100 text-orange-800',
  'WAITING INS SCOPE': 'bg-purple-100 text-purple-800',
  'READY TO INSTALL': 'bg-blue-100 text-blue-800',
  'INVOICED WPAYMENT': 'bg-indigo-100 text-indigo-800',
  'CLOSED-W NEW ROOF': 'bg-green-100 text-green-800',
  'CLOSED-DEAD DENIED': 'bg-red-100 text-red-800',
  'WAITING FEE': 'bg-gray-100 text-gray-800'
};

// Fee status colors
export const feeStatusColors = {
  'N/A': 'bg-gray-100 text-gray-800',
  'YES! :)': 'bg-green-100 text-green-800',
  'NO': 'bg-red-100 text-red-800',
  'PENDING': 'bg-yellow-100 text-yellow-800'
};

// Replacement type colors
export const replacementTypeColors = {
  'FULL REPLACEMENT': 'bg-red-100 text-red-800',
  'LAYOVER': 'bg-blue-100 text-blue-800',
  'PARTIAL REPLACEMENT': 'bg-orange-100 text-orange-800',
  'REPAIR': 'bg-green-100 text-green-800'
};

// Property type colors
export const propertyTypeColors = {
  'RESIDENTIAL': 'bg-blue-100 text-blue-800',
  'COMMERCIAL': 'bg-purple-100 text-purple-800',
  'MIXED USE': 'bg-indigo-100 text-indigo-800'
}; 