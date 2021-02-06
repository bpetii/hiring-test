import fetchMock from "jest-fetch-mock";
import oilRigs, {
  oilRigsLoaded,
  oilRigsRequested,
  oilRigsRequestFailed,
  oilRigsReceived,
} from "./oil-rigs";
import configureStore from "../../configureStore";

fetchMock.enableMocks();

const mockOilRigs = [
  {
    name: "Oil-rig-name",
    manufacturer: "Oil-rig-manufacturer",
    id: "oilrigs-id-1",
  },
];

const hello = () => "hello world test";

describe("employees", () => {
  let store;
  beforeEach(() => {
    store = configureStore();
    fetch.resetMocks();
  });

  const oilRigsSlice = () => store.getState().entities.oilRigs;

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
    expect(oilRigs(undefined, {})).toEqual({ list: [], loading: false });
  });

  it("should set loading when requested", () => {
    expect(oilRigs({ list: [], loading: false }, oilRigsRequested())).toEqual({
      list: [],
      loading: true,
    });
  });
  it("should set loading and list when recieved", () => {
    expect(
      oilRigs({ list: [], loading: false }, oilRigsReceived(mockOilRigs))
    ).toEqual({
      list: mockOilRigs,
      loading: false,
    });
  });

  it("should set loading when failed", () => {
    expect(
      oilRigs({ list: [], loading: false }, oilRigsRequestFailed())
    ).toEqual({
      list: [],
      loading: false,
    });
  });

  it("should set list when oil rigs loaded fetch function called", async () => {
    store.dispatch({ type: "oilRigs/oilRigsReceived", payload: mockOilRigs });
    expect(
      oilRigs({ list: [], loading: false }, oilRigsReceived(mockOilRigs))
    ).toEqual({
      list: oilRigsSlice().list,
      loading: oilRigsSlice().loading,
    });
  });
});
