// utils/mdProcessor.js
import fs from "fs/promises";
import path from "path";

export const readAndValidateMdFile = async (
  filePath,
  deleteAfterRead = false
) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    if (deleteAfterRead) {
      await fs.unlink(filePath);
    }

    return {
      content,
      isValid: content.length > 0,
      error: null,
    };
  } catch (error) {
    return {
      content: null,
      isValid: false,
      error: error.message,
    };
  }
};
