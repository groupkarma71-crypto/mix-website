import React, { useState } from "react";
import meeshologo from "../images/Meesho_logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "../components/LazyImage";
export default function Header() {
  const { cart } = useSelector(s => s?.cart); const navigate = useNavigate(); const [search, setSearch] = useState("");
  return <header className="sticky top-0 z-50 w-full border-b bg-white">
    <div className="mx-auto flex h-[60px] max-w-[1280px] items-center gap-4 px-4 md:h-[72px] md:px-6">
      <LazyImage onClick={() => navigate("/")} src={meeshologo} className="h-[25px] w-auto cursor-pointer md:h-[34px]" />
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try Saree, Kurti or Search by Product Code" className="hidden h-11 min-w-0 flex-1 rounded-md border px-4 text-sm outline-none md:block" />
      <div className="ml-auto hidden gap-5 text-[13px] md:flex"><span>Download App</span><span>Become a Supplier</span><span>Profile</span></div>
      <button onClick={() => cart?.length > 0 && navigate("/cart")} className="relative">🛒{cart?.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#9f2089] px-1.5 text-[10px] text-white">{cart.length}</span>}</button>
    </div>
    <div className="px-3 pb-3 md:hidden"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="h-10 w-full rounded-md border px-3 text-sm" /></div>
    </header>;
}