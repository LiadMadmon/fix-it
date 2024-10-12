import { BASE_URL } from "../../../consts"
import nock from 'nock';

export const mockSuccessResponse = () => {
  nock(`http://localhost:3000/${BASE_URL}/fix-request`).get('').reply(200);
}
