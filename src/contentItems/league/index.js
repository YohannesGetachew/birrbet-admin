import { useMutation, useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { AlertError } from "../../components/errors";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { LEAGUES, UPDATE_LEAGUE } from "../../graphql/league";
import getLeagueTableColumns from "./leagueTableColumns";
import CustomModal from "../../components/modal";
import { useTheme } from "@material-ui/core";
import { CancelButton } from "../../components/buttons";
import leagueStyle from "./style";
import { SubmitButton } from "../../components/buttons";

const handleLeagueUpdate = async (mutate, variables, successHandler) => {
  try {
    await mutate({
      variables: {
        ...variables,
        updateInput: {
          isTop: !variables.updateInput.isTop,
          isAvailable: variables.updateInput.isAvailable,
        },
      },
    });
    successHandler();
  } catch (err) {
    return;
  }
};

const editLeagueAvailability = async (id, isAvailable, isTop, mutate) => {
  try {
    await mutate({
      variables: {
        id,
        updateInput: {
          isTop,
          isAvailable: !isAvailable,
        },
      },
    });
    //window.location.reload(false);
  } catch (err) {
    return;
  }
};

const Leagues = () => {
  const topLeagueModalRef = useRef();
  const {
    data: leagues,
    loading: loadingLeagues,
    error: errorLoadingLeagues,
  } = useQuery(LEAGUES);

  const [
    mutate,
    { data: updatedLeague, loading: isUpdating, error: isLeageUpdateFailed },
  ] = useMutation(UPDATE_LEAGUE);

  const [mutationVariables, setMutationVariables] = useState({});

  const theme = useTheme();
  const style = leagueStyle();

  if (loadingLeagues) return <Loader />;
  if (errorLoadingLeagues) return <AlertError />;

  const handleModalOpen = (isTop, isAvailable, id) => {
    setMutationVariables({ id: id, updateInput: { isTop, isAvailable } });
    topLeagueModalRef.current.openModal();
  };

  const handleModalClose = () => {
    topLeagueModalRef.current.closeModal();
  };

  const columns = getLeagueTableColumns(
    theme,
    handleModalOpen,
    isUpdating,
    editLeagueAvailability,
    mutate
  );
  const modalMessage = mutationVariables?.updateInput?.isTop
    ? "Are you sure you want to remove this item from top league"
    : "Are you sure you want to make this a top league";
  return (
    <>
      {isLeageUpdateFailed && <AlertError />}
      <CustomModal ref={topLeagueModalRef}>
        <div className={style.modalContent}>
          <p> {modalMessage}</p>
          <div className={style.buttonsC}>
            <CancelButton onClick={handleModalClose} />
            <SubmitButton
              label="Yes"
              isSubmitting={isUpdating}
              customAction={() =>
                handleLeagueUpdate(mutate, mutationVariables, handleModalClose)
              }
            />
          </div>
        </div>
      </CustomModal>
      {isLeageUpdateFailed && <AlertError />}
      <Table columns={columns} data={leagues.leagues} />
    </>
  );
};
export default Leagues;

//   country: "World"
//   id: "524"
//   isAvailable: true
//   name: "Olympics Women"
//   order: 0
//   __typename: "League"
//   _id: "5f8acd68fd7c7d4c8f1ac2e5"
