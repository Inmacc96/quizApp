const helpers = {
  unsortAnswers: (answers: string[]): string[] => {
    return answers.sort(() => Math.random() - 0.5);
  },
};

export default helpers;
