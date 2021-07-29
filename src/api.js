'use strict';

const axios = require('axios');
const payloads = require('./payloads');
const apiUrl = 'https://slack.com/api';

/**
 * helper function to call POST methods of Slack API
 */
const callAPIMethodPost = async (method, payload) => {
  let result = await axios.post(`${apiUrl}/${method}`, payload, {
    headers: { Authorization: "Bearer " + process.env.SLACK_ACCESS_TOKEN }
  });
  return result.data;
}

/**
 * helper function to call GET methods of Slack API
 */
const callAPIMethodGet = async (method, payload) => {
  payload.token = process.env.SLACK_ACCESS_TOKEN
  let params = Object.keys(payload).map(key => `${key}=${payload[key]}`).join('&')
  let result = await axios.get(`${apiUrl}/${method}?${params}`);
  return result.data;
}

/**
 * helper function to receive all channels our bot user is a member of
 */
const getChannels = async (userId, channels, cursor) => {
  channels = channels || []

  let payload = {}
  if (cursor) payload.cursor = cursor
  let result = await callAPIMethodPost('users.conversations', payload)
  channels = channels.concat(result.channels)
  if (result.response_metadata && result.response_metadata.next_cursor && result.response_metadata.next_cursor.length)
    return getChannels(userId, channels, result.response_metadata.next_cursor)

  return channels
}

const requestLeave = async (user, submission) => {
  // Send the approver a direct message with "Approve" and "Reject" buttons 
  let res = await callAPIMethodPost('conversations.open', {
    users: submission.approver
  })
  submission.requester = user.id;
  submission.channel = res.channel.id;
  await callAPIMethodPost('chat.postMessage', payloads.approve(submission));
};

const rejectLeave = async (payload, leave) => {
  // 1. update the approver's message that this request has been denied
  await callAPIMethodPost('chat.update', {
    channel: payload.channel.id,
    ts: payload.message.ts,
    text: 'This request has been denied. I am letting the requester know!',
    blocks: null
  });

  // 2. send a notification to the requester
  let res = await callAPIMethodPost('conversations.open', {
    users: leave.requester
  })
  await callAPIMethodPost('chat.postMessage', payloads.rejected({
    channel: res.channel.id,
    leavetype: leave.leavetype,
    from: leave.from,
    to: leave.to,
    reason: leave.reason,
    channelString: leave.channelString
  }));
}

const postLeave = async (payload, leave) => {
  await callAPIMethodPost('chat.update', {
    channel: payload.channel.id,
    ts: payload.message.ts,
    text: 'Thanks! This post has been announced.',
    blocks: null
  });

  leave.channels.forEach(channel => {
    callAPIMethodPost('chat.postMessage', payloads.leave({
      channel: channel,
      leavetype: leave.leavetype,
      from: leave.from,
      to: leave.to,
      reason: leave.reason,
      requester: leave.requester,
      approver: leave.approver
    }));
  })
}



module.exports = {
  callAPIMethodPost,
  callAPIMethodGet,
  getChannels,
  rejectLeave,
  postLeave,
  requestLeave
}
