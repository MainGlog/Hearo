export default class Key {
    id!: number;
    name!: string;
    quality!: string;
    flatsCount!: number | null;
    doubleFlatsCount!: number | null;
    sharpsCount!: number | null;
    doubleSharpsCount!: number | null;
    relativeMinor!: string | null;
    relativeMajor!: string | null;

    constructor(id: number, name: string, quality: string,
                flatsCount: number | null, doubleFlatsCount: number | null,
                sharpsCount: number | null, doubleSharpsCount: number | null,
                relativeMinor: string | null, relativeMajor: string | null) {
        this.id = id;
        this.name = name;
        this.quality = quality;
        if (flatsCount) this.flatsCount = flatsCount;
        if (doubleFlatsCount) this.doubleFlatsCount = doubleFlatsCount;
        if (sharpsCount) this.sharpsCount = sharpsCount;
        if (doubleSharpsCount) this.doubleSharpsCount = doubleSharpsCount;
        if (relativeMinor) this.relativeMinor = relativeMinor;
        if (relativeMajor) this.relativeMajor = relativeMajor;
    }
}