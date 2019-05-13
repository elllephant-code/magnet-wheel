import magnetWheel from "./magnet-wheel"

const item1 = {
    position: 0,
    offset: 0
}

const item2 = {
    position: .25,
    offset: 0,
    resistance: 100
}

const item3 = {
    position: .25,
    offset: 0,
    resistance: 1000000000000
}

const wheel1 = {}
const wheel2 = {
    strength: 0
}

test("default values: Place item1 in wheel1", () => {
    expect(magnetWheel(item1, wheel1)).toEqual({
        radius: 0,
        angle: Math.PI / (-2)
    })
})

test("initial position: Place item2 in wheel1", () => {
    expect(magnetWheel(item2, wheel1).angle).toBeCloseTo(-0.2199, 1)
})

test("resistance: Place item3 in wheel1", () => {
    expect(magnetWheel(item3, wheel1).angle).toBeCloseTo(0)
})

test("strength: Place item2 in wheel2", () => {
    expect(magnetWheel(item2, wheel2).angle).toBeCloseTo(0)
})
