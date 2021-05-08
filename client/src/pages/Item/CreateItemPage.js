import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  Select,
  TextArea,
} from "../../components/Core";
import { UserContext } from "../../contexts/UserContext";

const categories = [
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function CreateItemPage({ history }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [auctionDate, setAuctionDate] = useState("");

  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    let seller = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("bidAmount", bidAmount);
    formData.append("description", description);
    formData.append("seller", JSON.stringify(seller));
    formData.append("image", image);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("auctionDate", auctionDate);

    try {
      let response = await (
        await fetch(`/api/item`, {
          method: "post",
          body: formData,
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
  };

  return (
    <FormBox>
      <Title center>Create a new Item</Title>
      <Form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
        <Input
          type="text"
          placeholder="Enter the Item Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        ></Input>
        <Select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((item, i) => (
            <option key={i} value={i + 1}>
              {item}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          placeholder="Enter the Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        ></Input>
        <Input
          type="text"
          placeholder="Enter the Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></Input>
        <Input
          type="datetime-local"
          value={auctionDate}
          onChange={(e) => setAuctionDate(e.target.value)}
          required
        ></Input>
        <Input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        ></Input>
        <TextArea
          placeholder="Enter the Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></TextArea>
        <Button>Create a Item</Button>
      </Form>
    </FormBox>
  );
}
