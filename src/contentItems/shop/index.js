import { useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { SHOPS } from "../../graphql/shop";
import getShopTableColumns from "./shopTableColumns";
import shopStyle from "./style";

const Shop = () => {
  const {
    data: shopsData,
    loading: loadingShops,
    error: errorLoadingShops,
  } = useQuery(SHOPS);

  const history = useHistory();

  const style = shopStyle();

  if (loadingShops) return <Loader />;
  if (errorLoadingShops) return <AlertError />;

  return (
    <div className={style.root}>
      <Button
        size="small"
        className={style.addBtn}
        onClick={() => history.push("/admin/shops/create")}
      >
        + Add shop
      </Button>
      <Table columns={getShopTableColumns(history)} data={shopsData.shops} />
    </div>
  );
};

export default Shop;
