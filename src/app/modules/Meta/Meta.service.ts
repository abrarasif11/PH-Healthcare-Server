import { UserRole } from "@prisma/client";
import { IAuthUser } from "../../interfaces/common.js";

const fetchDashboardMetaData = async (user: IAuthUser) => {
  let metaData;
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      metaData = getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      metaData = getDoctorMetaData(user as IAuthUser);
      break;
    case UserRole.PATIENT:
      metaData = getPatientMetaData(user);
      break;
    default:
      throw new Error("Invalid user role!");
  }

  return metaData;
};

const getSuperAdminMetaData = async (user: IAuthUser) => {};

const getAdminMetaData = async (user: IAuthUser) => {};

const getDoctorMetaData = async (user: IAuthUser) => {};

const getPatientMetaData = async (user: IAuthUser) => {};

export const MetaService = {
  fetchDashboardMetaData,
};
