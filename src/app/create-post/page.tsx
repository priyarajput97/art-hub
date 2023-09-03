"use client";

import React, { useState } from "react";
import IconAdd from "@/app/icon-components/IconAdd";
import Toggle from "../utils-components/Toggle";
import Link from "next/link";
import ButtonPrimary from "../utils-components/ButtonPrimary";
import ButtonSecondary from "../utils-components/ButtonSecondary";
import Input from "../utils-components/Input";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rajputpriya560@gmail.com.supabase.co",
  "jfcrgmokpeevmtoyowji"
);

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isForSale, setIsForSale] = useState(false);
  const [images, setImages] = useState([]);

  const handleImages = async (e: any) => {
    console.log(e.target.files);
    const avatarFile = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("Arthub-Images")
      .upload("public/priyarajput97-1.png", avatarFile);

    console.log(data, error);
  };

  const createPost = async () => {
    const apiData = {
      description,
      price: parseInt(price),
      quantity: parseInt(quantity),
      // images,
      shop: isForSale,
    };
    console.log(apiData);
    const res = await axios.post(
      "http://localhost:3000/api/post/create",
      apiData
    );
    console.log(res);
  };

  return (
    <div className="container mx-auto w-full sm:w-3/4 py-5">
      <div className="flex">
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="w-80 h-80 p-5 border border-gray-500 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer">
            <IconAdd className="w-16 h-16" />
            <span className="text-xs text-gray-500 mt-2">Upload images</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleImages}
            />
          </div>
        </label>
        <div className="grow ml-10">
          <textarea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type caption here..."
            className="w-full bg-slate-200 dark:bg-stone-900 p-2 focus:outline focus:outline-gray-500 rounded text-sm mb-5"
          />

          <Toggle
            enabled={isForSale}
            setEnabled={setIsForSale}
            title="Add to shop"
          />

          {isForSale && (
            <div className="flex gap-x-2 mt-5">
              <Input
                placeholder="Price"
                type="number"
                value={price}
                setValue={setPrice}
              />
              <Input
                placeholder="Qty"
                type="number"
                value={quantity}
                setValue={setQuantity}
              />
            </div>
          )}

          <div className="flex gap-x-5 mt-20 justify-end transition ease">
            <Link href="profile">
              <ButtonSecondary title="Cancel" />
            </Link>
            <ButtonPrimary title="Share" onClick={createPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
