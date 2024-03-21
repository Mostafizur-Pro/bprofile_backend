interface ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data?: Location[]; // Define the type of data
    error?: string;
  }

const getAllLocations = async (locations: any[]): Promise<ApiResponse> => {
    try {
      // You can perform any processing or filtering on the locations array here if needed
      return {
        statusCode: 200,
        success: true,
        message: "Locations fetched successfully",
        data: locations,
      };
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        message: "Internal server error",
        error: error.message,
      };
    }
  };

export const LocationsService = {
    getAllLocations, 
  };
  