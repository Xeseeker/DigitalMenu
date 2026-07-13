import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ItemDetail from "../components/ItemDetail";

export const ItemDetailsPage = () => {
  const { itemId } = useParams();

  return (
    <>
      <Navbar />
      <ItemDetail itemId={itemId} />
    </>
  );
};

export default ItemDetailsPage;
