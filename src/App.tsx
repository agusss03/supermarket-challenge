import { useEffect, useState } from "react";

import { SupermarketItem, SupermarketItems } from "./types/itemTypes";

function App() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<SupermarketItem>({
    id: "",
    name: "",
    description: "",
    price: 0,
  });
  const [itemList, setItemList] = useState<SupermarketItems>(() => JSON.parse(localStorage.getItem("itemList") ?? "[]"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }, [itemList]);

  const handleAddItem = () => {
    const id = (Math.random() * 1000).toString() + newItem.name;
    setOpenModal(false);
    setIsLoading(true)
    setItemList([...itemList, { ...newItem, id }]);
    setNewItem({ id: "", name: "", description: "", price: 0 });

    setTimeout(() => {
      setItemList([...itemList, { ...newItem, id }]);
      setIsLoading(false);
    }, 1500);

  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: dynamicNameValue, value } = e.target;
    setNewItem({ ...newItem, [dynamicNameValue]: value });
  };

  const handleItemRemove = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setItemList((oldValues) => oldValues.filter((itemList) => itemList.id !== id));
      setIsLoading(false);
    }, 1500);
  };
  
  const isAddButtonDisabled = newItem.name === ""

   return (
    <main className="bg-[#bccdd7] w-screen h-screen relative flex justify-center items-center">
      {openModal ? (
        <div className="bg-[#e0efee] rounded-lg p-5 justify-center content-center w-auto mx-auto h-auto">
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
              className="mb-4 rounded-lg h-8 w-full ps-1"
            />
            <input
              name="description"
              type="text"
              placeholder=" Description"
              onChange={handleItemChange}
              value={newItem.description}
              className="mb-4 rounded-lg h-8 w-full ps-1"
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleItemChange}
              value={newItem.price}
              className="mb-4 rounded-lg h-8 w-full ps-2"
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
              disabled={isAddButtonDisabled}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#e0efee] rounded-lg p-5 justify-center content-center w-auto mx-auto h-auto min-w-[18%]">
          <div className="flex flex-col items-center">
            <h1 className="mb-5 text-[20px] font-semibold text-[#1c2020]">
              Supermarket List
            </h1>
            {isLoading ? (
                <div className="flex justify-center items-center">
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#a9d3d3] to-[#47cea8] animate-spin">
                    <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                  </div>
                  <text>Loading...</text>
                </div>
              </div>
              ) : (
            <div className="flex flex-col items-center content-center">
              <div className="text-[#1c2020] text-[18x]">{itemList.length} Items added</div>
                <div className="mt-2 mb-2 text-[#1c2020] ">
                  {itemList.map((item) => (
                    <div className="flex gap-10 m-3">
                      <button className="rounded-full bg-[#bb4168] w-5 h-5 flex items-center justify-center pb-1 text-[#dcf7f9]" onClick={() => handleItemRemove(item.id)}>
                        x
                      </button>
                      <p>{item.description}</p>
                    </div>
                      ))}
                </div>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="bg-[#296b6e] w-40 rounded-lg mt-5 p-0.5 text-[#dcf7f9] font-medium"
                  >
                    Add
                  </button>
            </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
