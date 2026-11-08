import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";
import HomeCategory from "../components/HomeCategory";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import BestDeals from "../components/BestDeals";
import RecentlyAdded from "../components/RecentlyAdded";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const itemsStore = useSelector((store) => store.items);
  const items = Array.isArray(itemsStore) ? itemsStore : (itemsStore?.items || []);
  const searchQuery = useSelector((store) => store.search || "");

  const filteredItems = items.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item?.item_name?.toLowerCase().includes(query) ||
      item?.company?.toLowerCase().includes(query) ||
      (item?.category && item.category.toLowerCase().includes(query))
    );
  });

  return (
    <main>
      {!searchQuery ? (
        <>
          <HeroBanner />
          <HomeCategory />
          <FeaturedProducts />
          <TrendingProducts />
          <BestDeals />
          <RecentlyAdded />
        </>
      ) : (
        <div className="search-results-container">
          <h3 className="search-results-heading">
            Search Results for "{searchQuery}"
          </h3>
          <div className="items-container">
            {filteredItems.length === 0 ? (
              <p className="no-products-text">
                No product found matching "{searchQuery}"
              </p>
            ) : (
              filteredItems.map((item) => <HomeItem key={item.id} item={item} />)
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;