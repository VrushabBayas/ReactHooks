import PubNub from "pubnub";

import pubnubConfig from "./pubnub.config";

export const MESSGAE_CHANNEL = "MESSAGE_CHANNEL";

export default function PubSub() {
  const pubnub = new PubNub(pubnubConfig);

  pubnub.subscribe({ channels: [MESSGAE_CHANNEL] });

  this.addListener = listenerConfig => {
    pubnub.addListener(listenerConfig);
  };

  this.publish = message => {
    console.log("message: ", message);
    pubnub.publish({
      message: message,
      channel: MESSGAE_CHANNEL
    });
  };
}

// setTimeout(() => {}, 1000);
