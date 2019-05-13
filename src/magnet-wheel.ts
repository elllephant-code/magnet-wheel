import wheel, { IWheel, IWheelItem, IPolarCoodinates } from "@elllephant/wheel"

export interface IMagnetWheel extends IWheel {
    magnetPosition?: number
    strength?: number
}

export interface IMagnetWheelItem extends IWheelItem {
    resistance?: number
}

/**
 * @param x0 Distance initiale entre la source et d'attraction et l'objet soumis a l'effet.
 * @param K Intensite de la source d'attraction.
 * @param G Resistance au mouvement de l'objet.
 */
function attract(x0: number, K: number, G: number): number {
    const x1 = (x0 + Math.sqrt(x0 * x0 - 4 * (K / G))) / 2
    const x2 = (x0 - Math.sqrt(x0 * x0 - 4 * (K / G))) / 2

    if (Math.abs(x1) > Math.abs(x2)) {
        return x2
    }
    else {
        return x1
    }
}

/**
 * @param x0 Distance initiale entre la source et de repulsion et l'objet soumis a l'effet.
 * @param K Intensite de la source de repulsion.
 * @param G Resistance au mouvement de l'objet.
 */
function repulse(x0: number, K: number, G: number): number {
    const x1 = (x0 + Math.sqrt(x0 * x0 + 4 * (K / G))) / 2
    const x2 = (x0 - Math.sqrt(x0 * x0 + 4 * (K / G))) / 2

    if (Math.abs(x1) > Math.abs(x2)) {
        return x1
    }
    else {
        return x2
    }

}

function move(x0: number, K: number, G: number): number {
    if (K === 0) {
        return x0
    }

    return K > 0 ? repulse(x0, K, G) : attract(x0, K, G)
}

/** Les deux coordonees doivent etre exprimes par rapport au meme repere. */
function changeRepere(coordinate: number, repere: number): number {
    return coordinate - repere
}

// function equivalentOnSymClycleLevel(value: number, level: number, radius: number, origin): number {
//     return value + 2 * radius * (level - Math.floor((value - origin + radius) / (2 * radius)))
// }

function cutValue(value: number, floor: number, ceil: number): number {
    if (value < floor) {
        return floor
    }
    else if (value > ceil) {
        return ceil
    }
    else {
        return value
    }

}

function magnetWheel(item: IMagnetWheelItem, magnetWheel: IMagnetWheel): IPolarCoodinates {
    const initialPosition = item.position
    const offset = item.offset
    const G = item.resistance === undefined ? 10 : item.resistance

    const angularSector = magnetWheel.angularSector
    const rotation = magnetWheel.rotation
    const radius = magnetWheel.radius
    const origin = magnetWheel.magnetPosition === undefined ? .5 : magnetWheel.magnetPosition
    const K = magnetWheel.strength === undefined ? 1 : magnetWheel.strength

    const finalWheel: IWheel = {
        angularSector,
        rotation,
        radius
    }

    const relativePosition = changeRepere(initialPosition, origin)
    const relativeMovedPosition = move(relativePosition, K, G)
    const finalPosition = changeRepere(relativeMovedPosition, (-1) * origin)

    const finalItem: IWheelItem = {
        position: cutValue(finalPosition, 0, 1),
        offset
    }

    return wheel(finalItem, finalWheel)
}

export default magnetWheel