import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import { Kbd, ListGroup, Modal, Spinner } from "flowbite-react"

import MyCard from "../components/MyCard";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

const globalFridge = [
    "Milk",
    "Apple",
    "Red Wine",
    "Ham",
    "Salad",
    "Pickles",
    "Cheese",
    "Eggs",
    "Butter",
    "Yogurt",
    "Orange Juice",
    "Chicken",
    "Broccoli",
    "Carrots",
    "Tomatoes",
    "Cucumber",
    "Bell Peppers",
    "Grapes",
    "Bananas",
    "Strawberries",
    "Blueberries",
    "Spinach",
    "Mushrooms",
];

export default function Fridge() {
    const [addModal, setaddModal] = useState(false);
    const [generateModal, setGenerateModal] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const [userFridge, setUserFridge] = useState<string[]>([]);

    useEffect(() => {
        if (userFridge.length === 0)
            setUserFridge(globalFridge);
    }, []);

    return (
        <div className="bg-gray-100 h-screen">
            <div className="grid grid-cols-2 sm:grid-cols-4 mx-auto h-[80%] overflow-y-scroll overflow-x-hidden">
                {userFridge.map((item) => (
                    <MyCard name={item} callBack={() => setUserFridge((prev) => prev.filter((el) => el !== item))} />
                ))}
            </div>
            <div className="fixed bottom-24 right-8 z-10 overflow-y-hidden">
                <Button variant="contained" color="success" onClick={() => setaddModal(true)}>
                    Add +
                </Button>
                <Modal show={addModal} size="xl" onClose={() => setaddModal(false)} className="overflow-y-hidden">
                    <Modal.Header>
                        Add Item to your Fridge
                    </Modal.Header>
                    <Modal.Body className="overflow-y-scroll">
                    <div className="space-y-6 p-6">
                        <span className="flex space-x-2 m-2 overflow-x-scroll">
                            {
                                searchResults.map((item) => (
                                    <Kbd>
                                        {item}
                                    </Kbd>
                                ))
                            }
                        </span>
                        <span className="">
                            <TextField id="outlined-basic" label="Item" variant="outlined" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        </span>
                        <span className="min-h-32 w-full flex">
                            {
                                searchValue.length > 0 &&
                                <ListGroup className="w-full border rounded-lg min-h-32">
                                {globalFridge.filter((item) =>
                                    item.toLowerCase().includes(searchValue.toLowerCase())
                                ).slice(0, 3).map((item) => (
                                    <ListGroup.Item
                                        onClick={() => {
                                            if (!searchResults.includes(item))
                                                setSearchResults((prev) => [...prev, item]);
                                            setSearchValue("");
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p>{item}</p>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                                </ListGroup>
                            }
                        </span>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                setaddModal(false);
                                setUserFridge((prev) => [...prev, ...searchResults]);
                                setSearchResults([]);
                                setSearchValue("");
                            }}
                        >
                            Add item(s)
                        </Button>
                        <Button
                            onClick={() => {
                                setaddModal(false);
                                setSearchResults([]);
                                setSearchValue("");
                            }}
                            color="error"
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-10">
                <Button variant="contained" color="primary" onClick={() => setGenerateModal(true)}>
                    Generate
                </Button>
                <Modal show={generateModal} size="xl" onClose={() => setGenerateModal(false)}>
                    <Modal.Header>
                        Generation in progress...
                    </Modal.Header>
                    <Modal.Body>
                    <div className="space-y-6 p-6 mx-auto flex justify-center items-center">
                        <Spinner />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setGenerateModal(false)}>
                            <ThumbUp />
                        </Button>
                        <Button onClick={() => setGenerateModal(false)}>
                            <ThumbDown />
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="fixed bottom-24 left-8 z-10 overflow-y-hidden">
                <Button variant="contained" color="error" onClick={() => setUserFridge([])}>
                    Clear
                </Button>
            </div>
        </div>
    );
}
