import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Title,
  FormBox,
  Select,
} from "../../components/Core";

const categories = [
  "Painting",
  "Drawing",
  "Photographic Image",
  "Sculpture",
  "Carving",
];

export function CreateAuctionPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    let seller = "1";
    e.preventDefault();
    let data = {
      title,
      category,
      bidAmount,
      image,
      contact,
      address,
      expiryDate,
      seller,
    };
    console.log(data);
  };

  return (
    <FormBox>
      <Title center>Create a Product</Title>
      <Form onSubmit={handleSubmit} method="POST">
        <Input
          type="text"
          placeholder="Enter the Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Input
          type="number"
          placeholder="Enter the Bid Amount"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        ></Input>
        <Input
          type="number"
          placeholder="Enter your Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></Input>
        <Input
          type="text"
          placeholder="Enter the Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
        <Input
          type="datetime-local"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        ></Input>
        <Input
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></Input>
        <Button>Create a Product</Button>
      </Form>
    </FormBox>
  );
}
