import { useEffect, useState } from "react";

import { Button, TextField } from "@mui/material";
import { Kbd, ListGroup, Modal, Spinner } from "flowbite-react"

import MyCard from "../components/MyCard";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import MyNavBar from "../components/MyNavBar";

interface FridgeItem {
    name: string;
    url: string;
}

const globalFridge: FridgeItem[] = [
    {
        name: "Milk",
        url: ""
    },
    {
        name: "Apple",
        url: ""
    },
    {
        name: "Red Wine",
        url: ""
    },
    {
        name: "Ham",
        url: ""
    },
    {
        name: "Salad",
        url: ""
    },
    {
        name: "Pickles",
        url: ""
    },
    {
        name: "Cheese",
        url: ""
    },
    {
        name: "Eggs",
        url: ""
    },
    {
        name: "Butter",
        url: ""
    },
    {
        name: "Yogurt",
        url: ""
    },
    {
        name: "Orange Juice",
        url: ""
    },
    {
        name: "Chicken",
        url: ""
    },
    {
        name: "Broccoli",
        url: ""
    },
    {
        name: "Carrots",
        url: ""
    },
    {
        name: "Tomatoes",
        url: ""
    },
    {
        name: "Cucumber",
        url: ""
    },
    {
        name: "Bell Peppers",
        url: ""
    },
    {
        name: "Grapes",
        url: ""
    },
    {
        name: "Bananas",
        url: ""
    },
    {
        name: "Strawberries",
        url: ""
    },
    {
        name: "Blueberries",
        url: ""
    },
    {
        name: "Spinach",
        url: ""
    },
    {
        name: "Mushrooms",
        url: "",
    },
];

export default function Fridge() {
    const [addModal, setaddModal] = useState(false);
    const [generateModal, setGenerateModal] = useState(false);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<FridgeItem[]>([]);

    const [userFridge, setUserFridge] = useState<FridgeItem[]>([]);

    useEffect(() => {
        if (userFridge.length === 0)
            setUserFridge(globalFridge);
    }, []);

    return (
        <div>
            <MyNavBar />
            <div className="bg-gray-100 h-screen">
                <div className="grid grid-cols-2 sm:grid-cols-4 mx-auto h-[80%] overflow-y-scroll overflow-x-hidden">
                    {userFridge.map((item) => (
                        <MyCard name={item.name} callBack={() => setUserFridge((prev: any) => prev.filter((el: any) => el !== item))} />
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
                                        <Kbd onClick={() => setSearchResults((prev) => prev.filter((el) => el !== item))}>
                                            {item.name}
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
                                        item.name.toLowerCase().includes(searchValue.toLowerCase())
                                    ).slice(0, 3).map((item) => (
                                        <ListGroup.Item
                                            onClick={() => {
                                                if (!searchResults.includes(item))
                                                    setSearchResults((prev: any) => [...prev, item]);
                                                setSearchValue("");
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p>{item.name}</p>
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
                                    setUserFridge((prev) => [...prev, ...searchResults.filter((item) => {
                                        if (prev.map((el) => el.name).includes(item.name)) {
                                            alert(item.name + " is already in your fridge!");
                                            setaddModal(true);
                                            return false;
                                        }
                                        setSearchResults([]);
                                        setSearchValue("");
                                        setaddModal(false);
                                        return true
                                    })]);
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
        </div>
    );
}
