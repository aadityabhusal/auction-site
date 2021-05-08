import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  Select,
  TextArea,
  NoResults,
  DialogOverlay,
  DialogBox,
  DialogHead,
  DialogText,
  DialogAction,
} from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

const categories = [
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function EditItemPage({ history }) {
  const [item, setItem] = useState("");
  const [dialogBox, setDialogBox] = useState(false);
  const { itemId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getItem(itemId, user, history);
  }, [itemId, user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", item.title);
    formData.append("category", item.category);
    formData.append("bidAmount", item.bidAmount);
    formData.append("description", item.description);
    formData.append("seller", JSON.stringify(item.seller));
    formData.append("image", item.image);
    formData.append("contact", item.contact);
    formData.append("address", item.address);
    formData.append("auctionDate", item.auctionDate);

    try {
      let response = await (
        await fetch(`/api/item/${itemId}`, {
          method: "put",
          body: formData,
        })
      ).json();
      if (!response.error) {
        history.push(`/item/${itemId}`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function getItem(itemId, user, history) {
    try {
      let response = await fetch(`/api/item/${itemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      if (user._id !== data.seller._id) {
        history.push("/");
      } else {
        setItem(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (value, field) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  async function deleteItem(e) {
    try {
      let itemData = {
        itemId: itemId,
        sellerId: user._id,
      };
      let response = await (
        await fetch(`/api/item/${itemId}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        })
      ).json();
      if (!response.error) {
        history.push(`/user/${user._id}`);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return item ? (
    <FormBox>
      {dialogBox && (
        <DialogOverlay>
          <DialogBox>
            <DialogHead>Delete Item</DialogHead>
            <DialogText>Are you sure you want to delete this item?</DialogText>
            <DialogAction>
              <Button color="#c0392b" onClick={deleteItem}>
                Delete
              </Button>
              <Button onClick={(e) => setDialogBox(false)}>Cancel</Button>
            </DialogAction>
          </DialogBox>
        </DialogOverlay>
      )}
      <Title center>Edit Item Information</Title>
      <Form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
        <Input
          type="text"
          placeholder="Enter the Item Title"
          value={item.title}
          onChange={(e) => handleInput(e.target.value, "title")}
          required
        ></Input>
        <Select
          defaultValue={item.category}
          onChange={(e) => handleInput(e.target.value, "category")}
        >
          <option value="">Select a category</option>
          {categories.map((cat, i) => (
            <option key={i} value={i + 1}>
              {cat}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          placeholder="Enter the Bid Amount"
          value={item.bidAmount}
          onChange={(e) => handleInput(e.target.value, "bidAmount")}
          required
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={item.contact}
          onChange={(e) => handleInput(e.target.value, "contact")}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter the Address"
          value={item.address}
          onChange={(e) => handleInput(e.target.value, "address")}
          required
        ></Input>
        <Input
          type="datetime-local"
          value={new Date(item.auctionDate).toISOString().slice(0, -1)}
          onChange={(e) => handleInput(e.target.value, "auctionDate")}
          required
        ></Input>
        <Input
          type="file"
          onChange={(e) => handleInput(e.target.files[0], "image")}
        ></Input>
        <TextArea
          placeholder="Enter the Description"
          rows={5}
          value={item.description}
          onChange={(e) => handleInput(e.target.value, "description")}
          required
        ></TextArea>
        <Button>Edit Item</Button>
      </Form>
      <Button color="#c0392b" onClick={(e) => setDialogBox(true)}>
        Delete Item
      </Button>
    </FormBox>
  ) : (
    <NoResults>Loading...</NoResults>
  );
}
