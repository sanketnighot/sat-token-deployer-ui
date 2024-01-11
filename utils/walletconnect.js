import {
    AccountInfo,
    BlockExplorer,
    ColorMode,
    DAppClientOptions,
    Network,
    NetworkType,
} from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NETWORK, RPC } from './config';

export const dappClient = () => {
    let instance;

    async function init() {
        const dAppInfo = {
            name: "SAT Token Deployer",
            iconUrl: "/assets/logo.png",
            preferredNetwork: NETWORK,
            colorMode: ColorMode.DARK,
            appUrl: "https://example.com",
            featuredWallets: ['temple', 'naan', 'kukai', 'trust'],
        };

        return new BeaconWallet(dAppInfo);
    }
    async function loadWallet() {
        if (!instance) instance = await init();
        return instance;
    }

    async function getDAppClient() {
        const wallet = await loadWallet();
        return wallet.client;
    }
    async function getDAppClientWallet() {
        const wallet = await loadWallet();
        return wallet;
    }

    async function connectAccount() {
        const client = await getDAppClient();

        await client.clearActiveAccount();
        return client.requestPermissions({
            network: {
                type: NetworkType.GHOSTNET,
            },
        });
    }

    async function swapAccount(AccountInfo) {
        const client = await getDAppClient();

        await client.clearActiveAccount();
        await client.setActiveAccount(account);
        return account;
    }
    async function CheckIfWalletConnected() {
        try {
            const client = await getDAppClient();
            const activeAccount = await client.getActiveAccount();
            if (!activeAccount) {
                await client.requestPermissions({
                    network: {
                        type: NetworkType.GHOSTNET,
                    },
                });
            }
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    async function getAccount() {
        try {
            const client = await getDAppClient();
            const activeAccount = await client.getActiveAccount();
            return {
                success: true,
                account: activeAccount
            };
        } catch (error) {
            return {
                success: false,
                error,
            };
        }
    }

    async function tezos() {
        const { TezosToolkit } = await import("@taquito/taquito");
        const Tezos = new TezosToolkit(RPC);
        const wallet = await getDAppClientWallet();
        if (wallet) Tezos.setWalletProvider(wallet);
        return Tezos;
    }
    async function disconnectWallet() {
        const wallet = await getDAppClient();
        try {
            await wallet.disconnect();
            return {
                success: true,
                wallet: null,
            };
        } catch (error) {
            return {
                success: false,
                wallet: null,
                error,
            };
        }
    }
    return {
        getDAppClient,
        connectAccount,
        swapAccount,
        CheckIfWalletConnected,
        tezos,
        disconnectWallet,
        getAccount
    };
}