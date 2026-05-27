import axios from 'axios';

const generateAISuggestion = async (
   activity
) => {

   try {

      const prompt = `
      User stopped at a new location.

      Generate a short cinematic memory suggestion.

      Coordinates:
      ${activity.location.latitude},
      ${activity.location.longitude}
      `;

      const response = await axios.post(
      "http://localhost:5005/api/ai/memory",
         { prompt }
      );

      showMemoryModal(
         response.data.memoryText,
         activity
      );

   } catch (error) {

      console.log(error);
   }
};

export default generateAISuggestion 

