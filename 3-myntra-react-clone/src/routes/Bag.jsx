import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";
import { useSelector } from "react-redux";

const Bag = () => {
  const bagItems = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);
  
  // bagItems madhe {id, quantity} ahet, tyamule id match karun item sobat quantity map karu
  const finalItems = bagItems.map((bagItem) => {
    const item = items.find((i) => i.id === bagItem.id);
    return { ...item, quantity: bagItem.quantity };
  }).filter(item => item.id); // undefined filter karnyasathi

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {finalItems.map((item) => (
            <BagItem key={item.id} item={item} />
          ))}
        </div>
        <BagSummary finalItems={finalItems} />
      </div>
    </main>
  );
};

export default Bag;