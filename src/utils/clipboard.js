import message from "vanilla-antd-message";
export const copyToClipboard = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    message.success("Text copied to clipboard");
  } catch (err) {
    message.error("Error copying to clipboard");
  }
};
