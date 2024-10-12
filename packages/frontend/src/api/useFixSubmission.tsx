import { FixRequest, FixRequestStatus } from "@fix-it/shared-types";
import { useMutation } from "@tanstack/react-query"
import axios from 'axios';
import { BASE_URL } from "../consts";

const postFixRequest = (fixRequest: FixRequest) => {
  return axios.post(`${BASE_URL}/fix-request`, fixRequest);
}

export const useFixSubmission = ({
  onDone,
  onRejected,
}: {
  onDone: () => void;
  onRejected: () => void;
}) => {
  return useMutation(({
    mutationKey: ['submit-new-fix-request'],
    mutationFn: (fixRequest: FixRequest) => postFixRequest(fixRequest),
    onSuccess: ({ data }) => {
      if (data.status === FixRequestStatus.done) {
        onDone();
      } else {
        onRejected();
      }
    },
  }));
}
