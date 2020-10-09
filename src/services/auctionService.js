import HttpService from "./httpService";
export default class AuctionService extends HttpService {
  async fetchAuctions() {
    return this.get("auctions?status=OPEN");
  }

  async createAuction(title, pictureBase64) {
    const createAuctionResult = await this.post("auction", { title });
    await this.patch(
      `auction/${createAuctionResult.data.id}/picture`,
      pictureBase64
    );
  }

  async placeBid(id, amount) {
    return this.patch(`auction/${id}/bid`, { amount });
  }
}
