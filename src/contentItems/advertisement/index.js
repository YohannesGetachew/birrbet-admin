import { useQuery } from "@apollo/client";
import { Button, Grid } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { APP } from "../../graphql/app";
import advertisemetStyle from "./style";
import { useHistory } from "react-router-dom";

const Advertisement = () => {
  const {
    data: appData,
    loading: loadingApp,
    error: errorLoadingApp,
  } = useQuery(APP);
  const style = advertisemetStyle();
  const history = useHistory();
  if (loadingApp) return <Loader />;
  if (errorLoadingApp) return <AlertError />;

  const { advertisements } = appData.app;
  return (
    <>
      <div className={style.addAdvertisementC}>
        <Button
          className={style.addAdvertisement}
          onClick={() => history.push("/admin/advertisements/create")}
        >
          {" "}
          + Add advertisement
        </Button>
      </div>
      <Grid container className={style.root}>
        {advertisements.map((advertisement, index) => {
          return (
            <Grid
              key={advertisement.id}
              item
              xs={12}
              md={6}
              className={style.imageC}
            >
              <img
                className={style.image}
                src={advertisement.imagePath}
                alt={`Advertisement ${index + 1}`}
              />
              <Grid container className={style.imageInfo}>
                <Grid>
                  <h1 className={style.advertisemetTitle}>
                    {advertisement.name}
                  </h1>
                  <h3 className={style.position}>{advertisement.position}</h3>
                </Grid>
                <Grid className={style.actionsC}>
                  <span className={style.action}>
                    <CustomIconButton
                      type="edit"
                      handleClick={() =>
                        history.push(
                          `/admin/advertisements/edit/${advertisement.id}`
                        )
                      }
                    />
                  </span>
                  <span className={style.action}>
                    <CustomIconButton type="delete" />
                  </span>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Advertisement;

// id: "053cfa60-e7e9-11ea-a226-c12b22156cc0"
// imagePath: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAA"
// name: "First Banner"
// position: "Header"
// __typename: "Advertisement"
