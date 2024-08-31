import {useEffect, useState} from "react";
import {useFormik, FormikHelpers} from "formik";
import * as Yup from "yup";

import {toast} from "react-toastify";
import {Input} from "../Input";
import {Button} from "../Button";
import {useReadContract, useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {formatEther} from "viem";
import {uploadMetadataToIpfs} from "../../../api";
import {BLOCKSOURCE_CONTRACT_ADDRESS, BLOCKSOURCE_NFT_CONTRACT_ABI, MINTING_FEE} from "../../constants";

// Define types for props
interface UserInfoProps {
  onClose: () => void;
  onContinue?: () => void;
}

// Define the type for form values
interface FormValues {
  name: string;
  email: string;
}

function UserInfo({onClose, onContinue}: UserInfoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {data: hash, writeContract, isPending, error} = useWriteContract();
  const result = useReadContract({
    address: BLOCKSOURCE_CONTRACT_ADDRESS,
    abi: BLOCKSOURCE_NFT_CONTRACT_ABI,
    functionName: "totalSupply",
  });

  const results = useReadContract({
    address: BLOCKSOURCE_CONTRACT_ADDRESS,
    abi: BLOCKSOURCE_NFT_CONTRACT_ABI,
    functionName: "tokenURI",
    args: ["3"],
  });

  console.log({results});

  const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Nft was successfully minted");
      onContinue && onContinue();
    }

    if (error) {
      toast.error(error.message);
    }
  }, [isConfirmed, error]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string().email("Please enter a correct email").required("Email is required"),
  });

  const initialValues: FormValues = {
    name: "",
    email: "",
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const {metadata} = await uploadMetadataToIpfs(values.name, (result.data as BigInt).toString());

      writeContract({
        address: BLOCKSOURCE_CONTRACT_ADDRESS,
        value: MINTING_FEE,
        abi: BLOCKSOURCE_NFT_CONTRACT_ABI,
        functionName: "mintNFT",
        args: [metadata],
      });
    } catch (error) {
      toast.error("An Error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <p className="mb-3 green-gradient-text text-xl font-extrabold">Mint your NFT Ticket</p>
      {hash && <p className="mb-3 green-gradient-text text-xl font-extrabold">Transaction Hash: {hash}</p>}
      {isConfirming && <p className="mb-3 green-gradient-text text-xl font-extrabold">Waiting for confirmation...</p>}
      {isConfirmed && <p className="mb-3 green-gradient-text text-xl font-extrabold">Transaction confirmed.</p>}

      <br className="my-5" />

      <Input
        name="email"
        formik={formik}
        label="Enter email address"
        placeholder="name@domain.com"
        msg="You will receive your NFT through this email"
      />
      <br className="my-5" />

      <Input name="name" formik={formik} label="Enter your Full Name" placeholder="name" />
      <br className="my-5" />

      <br className="my-5" />
      <div className="flex justify-end">
        <Button
          text="Cancel"
          icon={true}
          onClick={(e) => {
            onClose();
            e.preventDefault();
          }}
        />

        <Button
          loading={isLoading || isPending || isConfirming}
          disabled={!formik.isValid || !formik.dirty || isLoading || isPending || isConfirming}
          type="primary"
          text={isLoading ? "Generating Ticket..." : isPending || isConfirmed ? "Confirming..." : "Continue"}
          onClick={() => {}}
        />
      </div>
    </form>
  );
}

export default UserInfo;
