import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid } from "@material-ui/core";
import React from "react";
import { CustomIconButton } from "../../components/buttons/iconButtons";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import { APP, UPDATE_APP } from "../../graphql/app";
import advertisemetStyle from "./style";
import { useHistory } from "react-router-dom";

const handleAdvertDelete = (advertToDeleteId, app, mutate, history) => {
  const adsWithoutTypeName = app.advertisements
    .filter((ad) => ad.id !== advertToDeleteId)
    .map((ad) => {
      const adWithoutTypeName = {};
      if (ad.__typename) {
        adWithoutTypeName.id = ad.id;
        adWithoutTypeName.imagePath = ad.imagePath;
        adWithoutTypeName.name = ad.name;
        adWithoutTypeName.position = ad.position;
      }
      return adWithoutTypeName;
    });

  const variables = {
    id: app._id,
    appInput: { advertisements: [...adsWithoutTypeName] },
  };
  mutate({ variables })
    .then(() => {
      history.push("/admin/advertisements");
    })
    .catch((e) => {
      return;
    });
};

const Advertisement = () => {
  const {
    data: appData,
    loading: loadingApp,
    error: errorLoadingApp,
  } = useQuery(APP);
  const [mutate, { error, loading, data }] = useMutation(UPDATE_APP);
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
      {advertisements.length ? (
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
                <div className={style.imageCard}>
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
                      <h3 className={style.position}>
                        {advertisement.position}
                      </h3>
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
                        <CustomIconButton
                          type="delete"
                          loading={loading}
                          handleClick={() =>
                            handleAdvertDelete(
                              advertisement.id,
                              appData.app,
                              mutate,
                              history
                            )
                          }
                        />
                      </span>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <h3 className={style.noAdvertisements}>
          No advertisements available{" "}
          <span role="img" aria-label="sad">
            &#128532;
          </span>
        </h3>
      )}
    </>
  );
};

export default Advertisement;
