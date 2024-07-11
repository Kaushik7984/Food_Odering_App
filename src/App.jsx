import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./Store/cartContext";

function App() {
  return (
    
      <CartContextProvider>
        <Header />
        <Meals />
      </CartContextProvider>
    
  );
}

export default App;
