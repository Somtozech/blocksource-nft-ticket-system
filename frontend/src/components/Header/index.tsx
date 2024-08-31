import {Logo, WalletButton} from "../index";

function Header() {
  return (
    <div className="w-full py-6 flex items-center justify-between max-w-1400px mx-auto">
      <Logo />
      <WalletButton />
    </div>
  );
}

export {Header};
