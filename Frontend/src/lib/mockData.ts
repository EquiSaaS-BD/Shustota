export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  qualifications: {
    degree: string;
    institute: string;
    year: string;
    verified: boolean;
  }[];
  specialty: string;
  experienceYears: number;
  hospital: string;
  location: string;
  rating: number;
  reviews: number;
  fee: number;
  availability: "Available Today" | "Available Tomorrow" | "Next Week";
  image: string;
  about: string;
  mapLocation: {
    lat: number;
    lng: number;
  };
  timeSlots: string[];
  chambers: {
    name: string;
    address: string;
    days: string;
    time: string;
  }[];
}

export const mockDoctors: DoctorProfile[] = [
  {
    id: "doc_01",
    name: "Dr. Anisur Rahman",
    title: "Senior Consultant, Cardiology",
    qualifications: [
      { degree: "MBBS", institute: "Dhaka Medical College", year: "2005", verified: true },
      { degree: "MD (Cardiology)", institute: "BSMMU", year: "2010", verified: true },
      { degree: "FRCP", institute: "Royal College of Physicians, London", year: "2015", verified: true }
    ],
    specialty: "Cardiologist",
    experienceYears: 15,
    hospital: "National Heart Foundation",
    location: "Mirpur, Dhaka",
    rating: 4.9,
    reviews: 342,
    fee: 1200,
    availability: "Available Today",
    image: "https://i.pravatar.cc/300?u=anis",
    about: "Dr. Anisur Rahman is a highly acclaimed Cardiologist with over 15 years of experience in treating complex heart diseases. He specializes in Interventional Cardiology and has successfully performed over 2,000 angioplasty procedures.",
    mapLocation: { lat: 23.8052, lng: 90.3639 },
    mapLocation: { lat: 23.8052, lng: 90.3639 },
    timeSlots: ["09:00 AM", "10:30 AM", "04:00 PM", "06:30 PM"],
    chambers: [
      {
        name: "National Heart Foundation",
        address: "Mirpur 2, Dhaka 1216",
        days: "Sat, Sun, Tue, Thu",
        time: "09:00 AM - 01:00 PM"
      },
      {
        name: "Labaid Cardiac Hospital",
        address: "House 1, Road 4, Dhanmondi, Dhaka",
        days: "Mon, Wed",
        time: "05:00 PM - 09:00 PM"
      }
    ]
  },
  {
    id: "doc_02",
    name: "Dr. Salma Begum",
    title: "Professor of Neurology",
    qualifications: [
      { degree: "MBBS", institute: "Sir Salimullah Medical College", year: "1998", verified: true },
      { degree: "FCPS (Neurology)", institute: "BCPS", year: "2006", verified: true }
    ],
    specialty: "Neurologist",
    experienceYears: 20,
    hospital: "Square Hospital",
    location: "Panthapath, Dhaka",
    rating: 4.8,
    reviews: 215,
    fee: 1500,
    availability: "Available Tomorrow",
    image: "https://i.pravatar.cc/300?u=salma",
    about: "Dr. Salma Begum is a pioneer in Neuro-medicine in Bangladesh. She has extensive experience in treating strokes, epilepsy, and movement disorders. She is currently serving as the Head of the Neurology Department at Square Hospital.",
    mapLocation: { lat: 23.7533, lng: 90.3815 },
    mapLocation: { lat: 23.7533, lng: 90.3815 },
    timeSlots: ["11:00 AM", "12:00 PM", "05:00 PM"],
    chambers: [
      {
        name: "Square Hospital",
        address: "18F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath",
        days: "Sun, Mon, Wed, Thu",
        time: "11:00 AM - 02:00 PM"
      }
    ]
  },
  {
    id: "doc_03",
    name: "Dr. Kamrul Hasan",
    title: "Assistant Professor, Internal Medicine",
    qualifications: [
      { degree: "MBBS", institute: "Mymensingh Medical College", year: "2012", verified: true },
      { degree: "MCPS", institute: "BCPS", year: "2016", verified: true },
      { degree: "FCPS (Medicine)", institute: "BCPS", year: "2019", verified: true }
    ],
    specialty: "Medicine Specialist",
    experienceYears: 8,
    hospital: "Dhaka Medical College",
    location: "Shahbag, Dhaka",
    rating: 4.7,
    reviews: 189,
    fee: 800,
    availability: "Available Today",
    image: "https://i.pravatar.cc/300?u=kamrul",
    about: "Dr. Kamrul Hasan is a dedicated Medicine Specialist known for his patient-centric approach. He deals with diabetes, hypertension, and infectious diseases with a high success rate.",
    mapLocation: { lat: 23.7275, lng: 90.3967 },
    mapLocation: { lat: 23.7275, lng: 90.3967 },
    timeSlots: ["08:00 AM", "09:30 AM", "03:00 PM", "04:30 PM", "08:00 PM"],
    chambers: [
      {
        name: "Dhaka Medical College Hospital",
        address: "Secretariat Road, Dhaka 1000",
        days: "Sat to Thu",
        time: "08:00 AM - 02:00 PM"
      },
      {
        name: "Popular Diagnostic Center",
        address: "House 16, Road 2, Dhanmondi",
        days: "Sun, Tue, Thu",
        time: "06:00 PM - 10:00 PM"
      }
    ]
  },
  {
    id: "doc_04",
    name: "Dr. Farzana Alam",
    title: "Consultant, Gynecology & Obstetrics",
    qualifications: [
      { degree: "MBBS", institute: "Dhaka Medical College", year: "2008", verified: true },
      { degree: "DGO", institute: "BSMMU", year: "2012", verified: true },
      { degree: "FCPS (Obs & Gynae)", institute: "BCPS", year: "2015", verified: true }
    ],
    specialty: "Gynecologist",
    experienceYears: 12,
    hospital: "Labaid Specialized Hospital",
    location: "Dhanmondi, Dhaka",
    rating: 4.9,
    reviews: 412,
    fee: 1000,
    availability: "Next Week",
    image: "https://i.pravatar.cc/300?u=farzana",
    about: "Dr. Farzana Alam is a leading Gynecologist with a special interest in high-risk pregnancies and laparoscopic surgeries. She ensures comprehensive care for women of all ages.",
    mapLocation: { lat: 23.7431, lng: 90.3828 },
    mapLocation: { lat: 23.7431, lng: 90.3828 },
    timeSlots: ["10:00 AM", "11:30 AM", "06:00 PM"],
    chambers: [
      {
        name: "Labaid Specialized Hospital",
        address: "House 6, Road 4, Dhanmondi",
        days: "Sat, Mon, Wed",
        time: "10:00 AM - 01:00 PM"
      },
      {
        name: "Green Life Hospital",
        address: "32 Green Road, Dhaka",
        days: "Sun, Tue, Thu",
        time: "05:00 PM - 08:00 PM"
      }
    ]
  }
];
