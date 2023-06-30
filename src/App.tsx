import { useState } from "react";

import { SupermarketItem, SupermarketItems } from "./types/itemTypes";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<SupermarketItem>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });
  const [itemList, setItemList] = useState<SupermarketItems>([]);
  const handleAddItem = () => {
    const id = (Math.random() * 1000).toString() + newItem.name;
    setItemList([...itemList, { ...newItem, id }]);
    setOpenModal(false);
    setNewItem({ id: "", name: "", description: "", price: 0 });
  };
  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: dynamicNameValue, value } = e.target;
    setNewItem({ ...newItem, [dynamicNameValue]: value });
  };

  return (
    <main className="bg-[#bccdd7] w-screen h-screen relative flex justify-center items-center">
      {openModal ? (
        <div className="bg-[#e0efee] rounded-lg p-3 justify-center content-center w-[20%] mx-auto h-[28%]">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-[20px] font-semibold text-[#1c2020]">
              Add items
            </h1>
            <input
              name="name"
              type="text"
              placeholder=" Name"
              onChange={handleItemChange}
              value={newItem.name}
              className="mb-4 rounded-lg h-8 w-full"
            />
            <input
              name="description"
              type="text"
              placeholder=" Description"
              onChange={handleItemChange}
              value={newItem.description}
              className="mb-4 rounded-lg h-8 w-full"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleItemChange}
              value={newItem.price}
              className="mb-4 rounded-lg h-8 w-full"
            />
          </div>
          <div className="flex items-center gap-4 w-full justify-center">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-[#bb4168] w-40 rounded-lg mt-5 p-0.5 text-[#dcf7f9] font-medium"
            >
              Close
            </button>
            <button
              className="bg-[#38a284] w-40 rounded-lg mt-5 p-0.5 text-[#dcf7f9] font-medium"
              onClick={handleAddItem}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#e0efee] rounded-lg p-4 justify-center content-center w-[16%] mx-auto h-auto">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-[20px] font-semibold text-[#1c2020]">
              Supermarket List
            </h1>
            <div className="text-[#1c2020]">{itemList.length} Items added</div>
            <div className="mt-2 mb-2 text-[#1c2020]">
              {itemList.map((item) => (
                <div>{item.description}</div>
              ))}
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#296b6e] w-40 rounded-lg mt-5 p-0.5 text-[#dcf7f9] font-medium"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
