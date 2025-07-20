using System.Security.Claims;
using Duende.IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityService.Pages.Account.Register;

[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Index(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    [BindProperty] public RegisterViewModel Input { get; set; }
    [BindProperty] public bool RegisterSuccess { get; set; }

    /// <summary>
    /// what happens when the user first gets to this page
    /// primary types are in the query string
    /// </summary>
    public IActionResult OnGet(string returnUrl)
    {
        Input = new RegisterViewModel
        {
            ReturnUrl = returnUrl
        };

        return Page();
    }

    public async Task<IActionResult> OnPost(string returnUrl)
    {
        if (Input.Button != "register")
        {
            // this means they hit cancel
            // so redirect them back to the home page
            return Redirect("~/");
        }

        if (ModelState.IsValid)
        {
            var user = new ApplicationUser
            {
                UserName = Input.Username,
                Email = Input.Email,
                EmailConfirmed = true,
            };

            var results = await _userManager.CreateAsync(user, Input.Password);

            if (results.Succeeded)
            {
                await _userManager.AddClaimsAsync(user, [
                    new Claim(JwtClaimTypes.Name, Input.FullName)
                ]);

                RegisterSuccess = true;
            }
        }

        return Page();
    }
}