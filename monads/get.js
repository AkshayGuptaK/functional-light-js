const get = (obj) => (fallback = null) =>
  function getProp(prop) {
    if (prop == null) {
      // return the value
    }
    return;
  };

//tests
const log = console.log.bind(console);

const person = {
  name: "Axy",
  age: 18,
  location: "Berkeley",
  interests: ["chess", "kittens", "quantum gravity"],
};

log(get(person)(null)("name")() === "Axy");
log(get(person)(null)("name")("surname")() === null);
log(get(person)("M")("sex")() === "M");
log(get(person)(null)("interests")(1)() === "kittens");
log(get(person)()("phone")("home")() === null);
