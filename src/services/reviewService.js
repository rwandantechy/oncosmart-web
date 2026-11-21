import { ENDPOINTS } from "./endpoints";
import { request } from "./httpClient";
import { REVIEW } from "../content/review";

export function listPending(options) {
  return request(ENDPOINTS.reviewPending, {
    defaultError: REVIEW.loadError,
    ...options,
  });
}

export function updateReview(recordId, fields, options) {
  return request(ENDPOINTS.reviewItem(recordId), {
    method: "PATCH",
    body: fields,
    defaultError: REVIEW.saveError,
    ...options,
  });
}

export function deleteReview(recordId, options) {
  return request(ENDPOINTS.reviewItem(recordId), {
    method: "DELETE",
    defaultError: REVIEW.actionError,
    ...options,
  });
}

export function approveReview(recordId, options) {
  return request(ENDPOINTS.reviewApprove(recordId), {
    method: "POST",
    defaultError: REVIEW.actionError,
    ...options,
  });
}

export function rejectReview(recordId, options) {
  return request(ENDPOINTS.reviewReject(recordId), {
    method: "POST",
    defaultError: REVIEW.actionError,
    ...options,
  });
}
