import HttpService from "./httpService";
export default class AuctionService extends HttpService {
  async fetchAuctions() {
    try {
      const result = await this.get("/auctions?status=OPEN");
      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  async createAuction(title, pictureBase64) {
    try {
      const createAuctionResult = await this.post("/auction", { title });
      await this.patch(
        `/auction/${createAuctionResult.data.id}/picture`,
        pictureBase64
      );
    } catch (err) {
      console.error(err);
    }
  }

  async placeBid(id, amount) {
    try {
      await this.patch(`/auction/${id}/bid`, { amount });
    } catch (err) {
      console.error(err);
    }
  }
}
