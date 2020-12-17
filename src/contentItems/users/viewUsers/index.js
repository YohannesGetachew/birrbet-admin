import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@material-ui/core";
import Table from "../../../components/table";
import getUsersTableColumns from "./usersTableColumns";
import { useHistory } from "react-router-dom";
import useGetCurrentUserRole from "../../../customHooks/helpers/useGetCurrentUserRole";
import { ConfirmActionAlert } from "../../../components/alerts";
import { useDeleteUser } from "../../../customHooks/dataMutators";
import CustomModal from "../../../components/modal";
import confirmModalStyle from "./style";

const ViewUsers = ({ users }) => {
  const deleteModalRef = useRef();
  const openModal = () => {
    deleteModalRef.current.openModal();
  };
  const closeModal = () => {
    deleteModalRef.current.closeModal();
  };
  const [userToDeleteId, setUserToDeleteId] = useState();
  useEffect(() => {
    if (userToDeleteId) {
      openModal();
    }
  }, [userToDeleteId]);
  const history = useHistory();
  const theme = useTheme();
  const currentUserRole = useGetCurrentUserRole();
  const usersColumn = getUsersTableColumns(
    theme,
    history,
    currentUserRole,
    setUserToDeleteId
  );
  const [deleteUser, { loading, error }] = useDeleteUser();

  const handleDelete = async (id) => {
    try {
      await deleteUser({
        variables: {
          id,
        },
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  const style = confirmModalStyle();
  return (
    <>
      <CustomModal ref={deleteModalRef}>
        <div className={style.confirmActionModal}>
          <ConfirmActionAlert
            message={
              <div className={style.messageC}>
                Are you sure you want to delete this user ?
              </div>
            }
            error={error}
            submitLoading={loading}
            submitLabel={"YES"}
            onSubmitClick={() => handleDelete(userToDeleteId)}
            onCancleClick={closeModal}
          />
        </div>
      </CustomModal>
      <Table data={users} columns={usersColumn} />
    </>
  );
};
export default ViewUsers;
