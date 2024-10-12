import { FixRequest } from "@fix-it/shared-types";
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from "../consts";

const postFixRequest = (fixRequest: FixRequest) => {
  return axios.post(`${BASE_URL}/fix-request`, fixRequest);
}

export const useFixSubmission = ({
  onSuccess,
  onError,
}: {
  onSuccess: ((data: AxiosResponse<any, any>, variables: FixRequest, context: unknown) => Promise<unknown> | unknown) | undefined;
  onError: ((error: unknown, variables: FixRequest, context: unknown) => Promise<unknown> | unknown) | undefined
}) => {
  return useMutation(({
    mutationKey: ['submit-new-fix-request'],
    mutationFn: (fixRequest: FixRequest) => postFixRequest(fixRequest),
    onSuccess,
    onError,
  }));
}
