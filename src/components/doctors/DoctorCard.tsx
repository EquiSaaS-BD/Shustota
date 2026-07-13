import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Award, CheckCircle2 } from "lucide-react";
import { DoctorProfile } from "@/lib/mockData";

interface DoctorCardProps {
  doctor: DoctorProfile;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="w-full h-[380px] bg-white border border-slate-200 rounded-[16px] p-6 flex flex-col relative group hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,61,155,0.1)] hover:border-primary/30 transition-all duration-300">
      
      {/* Top Header: Avatar & Simple Rating */}
      <div className="flex justify-between items-start mb-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-200 relative bg-slate-50 z-10">
            <Image 
              src={doctor.image} 
              alt={doctor.name} 
              fill 
              sizes="80px"
              className="object-cover" 
            />
          </div>
          <div className="absolute -bottom-1 -right-1 z-20 bg-white rounded-full p-0.5">
            <CheckCircle2 size={20} className="text-[#22C55E] fill-white" />
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-[#0F172A] font-bold text-[14px]">
          <Star size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
          {doctor.rating}
        </div>
      </div>

      {/* Doctor Core Info */}
      <div className="flex flex-col mb-auto">
        <h3 className="font-bold text-[20px] text-slate-900 mb-0.5 truncate">
          {doctor.name}
        </h3>
        <p className="text-[14px] text-slate-500 mb-3">
          {doctor.specialty}
        </p>
        <p className="text-[14px] text-slate-600 line-clamp-2 leading-snug">
          {doctor.hospital}
        </p>
      </div>

      {/* Footer: Fee & Action */}
      <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
        <div>
          <p className="text-[12px] text-slate-500 uppercase mb-0.5 tracking-wider">Fee</p>
          <div className="font-bold text-[18px] text-slate-900">
            ৳{doctor.fee}
          </div>
        </div>
        <Link 
          href={`/doctors/${doctor.id}`}
          className="flex items-center justify-center px-6 h-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-[10px] text-[14px] font-bold transition-all duration-300 group-hover:shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
