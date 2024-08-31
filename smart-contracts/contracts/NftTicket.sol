// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockSourceNft is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public mintingFee = 0.0001 ether;

 
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
        Ownable(msg.sender)
    {
        
    }

    function mintNFT(string memory _tokenURI) public payable returns (uint256){
        uint256 newItemId = _tokenIdCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
      _tokenIdCounter++;

      return newItemId;
    }


    function setMintingFee(uint256 newFee) public onlyOwner {
        mintingFee = newFee;
    }

    function totalSupply() public view virtual returns (uint256) {
        return  _tokenIdCounter;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    

     function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
