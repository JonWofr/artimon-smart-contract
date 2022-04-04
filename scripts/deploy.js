const hre = require('hardhat');

const main = async () => {
  const Artimon = await hre.ethers.getContractFactory('Artimon');
  const artimon = await Artimon.deploy();

  await artimon.deployed();
  console.log(`Artimon deployed to: ${artimon.address}`);

  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 150 149" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g transform="matrix(1,0,0,1,-861.779,-571.587)">
            <g id="v" transform="matrix(1,0,0,1,-129.102,208.489)">
                <path d="M1042.98,487.943C1034.39,483.204 1026.05,477.508 1018.38,470.659C980.646,436.965 992.718,365.529 992.718,365.529L992.909,365.489C996.819,364.703 1060.14,352.691 1101.86,391.047C1150.07,435.383 1139.24,506.669 1138.51,511.073L1138.48,511.288L1138.27,511.292C1136.16,511.319 1118.37,511.392 1095.37,506.655C1106.75,500.328 1114.46,488.18 1114.46,474.247C1114.46,453.799 1097.86,437.198 1077.41,437.198C1056.96,437.198 1040.36,453.799 1040.36,474.247C1040.36,479.083 1041.29,483.704 1042.98,487.943Z" style="fill:url(#_Linear1);"/>
            </g>
        </g>
        <defs>
            <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(149.169,0,0,149.169,990.88,437.198)"><stop offset="0" style="stop-color:rgb(121,174,227);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(121,226,138);stop-opacity:1"/></linearGradient>
        </defs>
    </svg>`;
  const encodedSvg = Buffer.from(svg).toString('base64');
  const json = JSON.stringify({
    name: 'Test',
    description: 'Test description',
    image: `data:image/svg+xml;base64,${encodedSvg}`,
  });
  const encodedJson = Buffer.from(json).toString('base64');

  const tokenURI = `data:application/json;base64,${encodedJson}`;
  let txn = await artimon.makeNFT(tokenURI);
  console.log('Minting ARTI...');
  await txn.wait();

  console.log('ARTI minted');
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
