import { FixRequestStatus } from "@fix-it/shared-types";
import { BASE_URL } from "../../../consts"
import nock from 'nock';

export const mockRequestDoneResponse = () => {
  nock(`${BASE_URL}/fix-request`).post('').reply(200, { status: FixRequestStatus.done }).persist(false);
}

export const mockRejectedResponse = () => {
  nock(`${BASE_URL}/fix-request`).post('').reply(200, { status: FixRequestStatus.rejected }).persist(false);
}
