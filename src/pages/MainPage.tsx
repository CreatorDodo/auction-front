import React from "react";
import SearchBar from "../widgets/Searchbar/SearchBar";
import CardList from "../widgets/Card/CardList";
import Header from "../widgets/Header/Header";
import Footer from "../widgets/Footer/Footer";
import MenuComponent from "../widgets/MenuComponent/MenuComponent";
import HotAuctionList from "@/features/auction/ui/HotAuction/HotAuctionList";
import CategoryAuction from "@/features/auction/ui/CategoryAuction/CategoryAuction";
const MainPage: React.FC = () => {
  return (
    <div className="items-center justify-center bg-gray-100 min-h-screen">
      <div className="hidden sm:block">
        <Header />
        <SearchBar />
      </div>
      <MenuComponent />
      <CardList />
      <CategoryAuction />
      <HotAuctionList />
      <Footer />
    </div>
  );
};

export default MainPage;
