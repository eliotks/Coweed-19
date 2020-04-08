
export default function is_light_square(square) {
    if (Math.floor(square / 8) % 2 === 0) {
        return (square % 8) % 2 === 0;
    }
    return (square % 8) % 2 === 1;
}