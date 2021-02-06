import fetchMock from "jest-fetch-mock";
import sites, {
  sitesRequested,
  sitesReceived,
  sitesRequestFailed,
} from "./sites";
import configureStore from "../../configureStore";

fetchMock.enableMocks();

const mockSites = [
  {
    name: "Site name",
    country: "Site country",
    oilRigs: ["oilrigs-id-1", "oilrigs-id-2"],
  },
];

const hello = () => "hello world test";

describe("employees", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
    fetch.resetMocks();
  });

  const sitesSlice = () => store.getState().entities.sites;

  /*
    Hello world test
  */

  test("hello world test", () => {
    expect(hello()).toBe("hello world test");
  });

  /*
    Solitary reducer tests
  */

  it("should handle initial state", () => {
    expect(sites(undefined, {})).toEqual({ list: [], loading: false });
  });

  it("should set loading when requested", () => {
    expect(sites({ list: [], loading: false }, sitesRequested())).toEqual({
      list: [],
      loading: true,
    });
  });

  it("should set loading and list when recieved", () => {
    expect(
      sites({ list: [], loading: false }, sitesReceived(mockSites))
    ).toEqual({
      list: mockSites,
      loading: false,
    });
  });

  it("should set loading when failed", () => {
    expect(sites({ list: [], loading: false }, sitesRequestFailed())).toEqual({
      list: [],
      loading: false,
    });
  });

  it("should set list when sitesloaded fetch function called", async () => {
    store.dispatch({ type: "sites/sitesReceived", payload: mockSites });
    expect(
      sites({ list: [], loading: false }, sitesReceived(mockSites))
    ).toEqual({
      list: sitesSlice().list,
      loading: sitesSlice().loading,
    });
  });
});
