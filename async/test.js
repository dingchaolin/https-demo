let asyncTest = async function( ){
    await setTimeout( function(){
        return 1;
    }, 1000 );
    return 2;
};

let test = async function( ){
    let ret = await asyncTest();
    console.log( ret );
}

test();
